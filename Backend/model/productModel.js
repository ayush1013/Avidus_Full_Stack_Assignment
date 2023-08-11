const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  title: String,
  image: String,
  description: String,
  location: String,
  datePeriod: String,
  price_perNight: Number,
  size: Number,
  userID: String,
  booked: {type: Boolean, default: false},
});

const productModel = mongoose.model("Product", productSchema);

module.exports = productModel;
