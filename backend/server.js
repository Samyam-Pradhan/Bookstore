const express = require("express");
const dotenv = require("dotenv");
const connectDb = require("./config/db");


const app = express();
const PORT = process.env.PORT || 5000;

connectDb();

app.get("/", (req, res)=>{
    res.send("E bookstore is running");
})

app.listen(PORT, () =>{
    console.log(`Server running on port ${PORT}`);
})
