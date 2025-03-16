const express = require("express");
const dotenv = require("dotenv");
const connectDb = require("./config/db");
//const bookRoutes = require("./routes/bookRoutes");
const userRoutes = require("./routes/userRoutes");
const app = express();
const PORT = process.env.PORT || 5000;


app.use(express.json());
app.use('/api/v1', userRoutes);
//app.use('/api', bookRoutes);

connectDb();
app.listen(PORT, () =>{
    console.log(`Server running on port ${PORT}`);
})
