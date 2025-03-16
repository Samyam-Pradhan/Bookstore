const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    avatar:{
        type:String,
        default:"./images/user.png"
    },
    role:{
        type:String,
        default:"user",
        enum:["user","admin"] //ensures that only "user" or "admin" can be assigned to the role field.
    },
    favourites: [{
        type: mongoose.Types.ObjectId,
        ref: "Book"
    }],
    cart: [{
        type: mongoose.Types.ObjectId,
        ref: "Book"
    }],
    order: [{
        type: mongoose.Types.ObjectId,
        ref: "Order"
    }],
}, { timestamps:true }) //adds two fields in schema createdAt and updatedAt


const User = new mongoose.model("User", userSchema); // here User is the name of mongodb modle which will interact with users collection and
                                                    //userSchema defines what a user should look like

module.exports = User;