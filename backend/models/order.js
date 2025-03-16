const mongoose = require("mongoose");

const ordersSchema = new mongoose.Schema({
    user:{
        type: mongoose.Types.ObjectId,
        ref: "User"
    },
    book:{
        type: mongoose.Types.ObjectId,
        ref: "Book"
    },
    status:{
        type:String,
        default:"Order Placed",
        enum:["Order Placed", "Our for Delivery", "Delivered", "Canceled"]
    },
}, { timestamps: true }) //will be used for sorting

module.exports = mongoose.model("Order", ordersSchema);