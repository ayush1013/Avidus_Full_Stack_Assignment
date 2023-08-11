const express = require("express");
const productRoute = express.Router();
const productModel = require("../model/productModel");
const AuthMiddleware = require("../Middlewares/AuthMiddleware");

productRoute.get("/", async (req, res) => {
  const text = req.query.text;
  const { limit = 40, page = 1, sort, order, size,location, id, maxPrice } = req.query;

  if (id) {
    try {
      const product = await productModel.findById(id);
      if (!product) {
        return res.status(404).send("Product not found");
      }
      return res.send(product);
    } catch (err) {
      return res.status(500).send("Internal Server Error");
    }
  }

  try {
    let query = {};
    if (text) {
      query.title = { $regex: text, $options: "i" };
    }
    if (size) {
      //   query.size = { $regex: size, $options: "i" };
      // const categories = Array.isArray(size) ? size : [size];
      // query.size = { $in: categories };
      query.size = { $lte: parseInt(size) };
    }
    if (location) {
      query.location = { $regex: location, $options: "i" };
    }
    if (maxPrice) {
      query.price_perNight = { $lte: parseInt(maxPrice) };
    }

    let productsQuery = productModel.find(query);

    // Sorting based on price
    if (sort === "price") {
      let sortOption = {};
      sortOption.price = order === "desc" ? -1 : 1;
      productsQuery.sort(sortOption);
    } else if (sort === "title") {
      let sortOption = {};
      sortOption.title = order === "desc" ? -1 : 1;
      productsQuery.sort(sortOption);
    }

    // Count total number of products matching the query
    const totalCount = await productModel.countDocuments(query);

    // Pagination
    const totalPages = Math.ceil(totalCount / limit);
    const currentPage = parseInt(page);
    productsQuery.limit(limit).skip(limit * (currentPage - 1));

    let products = await productsQuery.exec();

    res.send({
      totalItems: totalCount,
      totalPages: totalPages,
      currentPage: currentPage,
      items: products,
    });
  } catch (err) {
    res.send(err.message);
  }
});

productRoute.use(AuthMiddleware)

productRoute.post("/create", async (req, res) => {
  const payload = req.body;
  try {
    const product = new productModel(payload);
    await product.save();
    res.send("product created successfully");
  } catch (err) {
    console.log("product couldn't be created");
    console.log(err);
  }
});

productRoute.patch("/update/:id", async (req, res) => {
  const payload = req.body;
  const id = req.params.id;
  const product = await productModel.find({ _id: id });
  const userID_in_product = product[0].userID;
  const userID_in_req = req.body.userID;
  console.log(userID_in_product);
  console.log("getting from frontend - ", payload);
  try {
    if (userID_in_product === userID_in_req) {
      await productModel.findByIdAndUpdate({ _id: id }, payload);
      res.send("product updated successfully");
    } else {
      res.send("You are not athorized");
    }
  } catch (err) {
    console.log("product couldn't be updated");
    console.log(err);
  }
});

productRoute.delete("/delete/:id", async (req, res) => {
  const id = req.params.id;
  const product = await productModel.find({ _id: id });
  const userID_in_product = product[0].userID;
  const userID_in_req = req.body.userID;
  console.log(userID_in_product);
  try {
    if (userID_in_product === userID_in_req) {
      await productModel.findByIdAndDelete({ _id: id });
      res.send("product Deleted successfully");
    } else {
      res.send("You are not athorized");
    }
  } catch (err) {
    console.log("product couldn't be deleted");
    console.log(err);
  }
});

module.exports = productRoute;
