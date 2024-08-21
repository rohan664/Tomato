const mongoose = require("mongoose")

const orderSchema = new mongoose.Schema({
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "user"
    },
    amount : {
        type : String,
        required : true,
    },
    order : {
        type : Object,
        required : true
    }
},{timestamps : true})

const order = mongoose.model("order",orderSchema)

module.exports = order