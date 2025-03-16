const express = require("express");
const dotenv = require("dotenv");
const connectDb = require("./config/db");
const bookRoutes = require("./routes/bookRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

connectDb();

app.use('/api', bookRoutes);
app.listen(PORT, () =>{
    console.log(`Server running on port ${PORT}`);
})
