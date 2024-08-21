const mongoose = require("mongoose")

const userInfoShema = new mongoose.Schema({
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "users"
    },
    address : {
        type : Object,
        required : true
    },
    order : {
        type : Array,
        required: true
    }
},{timestamps : true})

const userInfo = mongoose.model("userInfo",userInfoShema)

module.exports = userInfo