const express = require("express");
const dotenv = require("dotenv");
/* const connectDb = require("./config/db"); */
const bookRoutes = require("./routes/bookRoutes");
const userRoutes = require("./routes/authRoutes");
const cors = require("cors");

dotenv.config(); // Load environment variables
//connectDb(); // Connect to MongoDB

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors()); // Allow requests from frontend (avoids CORS issues)
app.use(express.json());

// Routes
app.use('/api/v1', userRoutes);
app.use('/api/books', bookRoutes); 

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
