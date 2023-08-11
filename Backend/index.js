const express = require('express');
const app = express();
const cors = require('cors'); 
require ("dotenv").config();
const {connection} = require("./config/config.js");
const userRouter = require("./routes/userRoute.js");
const productRoute = require("./routes/productRoute.js");
const AuthMiddleware = require("./Middlewares/AuthMiddleware.js")

app.use(cors());
app.use(express.json());

app.get("/", (req,res)=>{
    res.send("Welcome to Home Page")
})

app.use("/user", userRouter);

// app.use(AuthMiddleware)

app.use("/product", productRoute);


app.listen(process.env.port, async()=>{
    try {
        await connection
        console.log("Successfully connected to the database")
    } catch (err) {
      console.log("Error while connecting to the Database");
      console.log(err);
    }

    console.log(`This server is running at port ${process.env.port}`)
})