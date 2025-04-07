const mongoose = require("mongoose");
require("dotenv").config();

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => {
    console.warn("⚠️ Database connection failed (continuing without DB)");
    console.warn(err.message);
  });


module.exports = connectDb;