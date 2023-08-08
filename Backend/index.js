const express = require('express');
const app = express();
const cors = require('cors'); 
require ("dotenv").config();
const {connection} = require("./config/config.js");

app.use(cors());

app.get("/", (req,res)=>{
    res.send("Welcome to Home Page")
})


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