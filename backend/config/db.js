const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config(); //loads the environment variables form .env file

const connectDb = async () =>{
    try{
        await mongoose.connect(process.env.URI);
        console.log("Sucessfully connected to DB");
    }
    catch(error){
        console.log("Database connection failed");
        process.exit(0);
        
    }
}

module.exports = connectDb;