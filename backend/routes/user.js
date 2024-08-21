const express = require("express")
const User = require("../model/user")
const crypto = require("crypto")
const jwt = require("jsonwebtoken")
const {something_went_wrong , user_add_successfully ,email_is_already_exits,user_data_not_found,login_successfully,invalid_password} = require("../constants/message")
const {responseBody} = require("../constants/commonFunction")
const {RESPONSE_STATUS_FAILURE,RESPONSE_STATUS_SUCCESS,ACCESS_EXPIRY_TIME,REFRESH_EXPIRY_TIME} = require("../constants/constants")
require("dotenv").config()


const routes = express.Router()

routes.post("/signup",async(req,res)=>{
    let body = req.body
    let emailExit = await User.findOne({email : body.email})
    if(emailExit){
        let response = responseBody(email_is_already_exits,RESPONSE_STATUS_FAILURE)
        return res.status(200).json(response)
    }
    const hash = crypto.createHash('sha256',process.env.HASH_SECERT_KEY).update(body.password).digest("hex")
    let result = User.create({
        fullName : body.fullName,
        email : body.email,
        password : hash
    })
    if(result){
        let response = responseBody(user_add_successfully,RESPONSE_STATUS_SUCCESS)
        return res.status(200).json(response)
    }
    else{
        let response = responseBody(something_went_wrong,RESPONSE_STATUS_FAILURE)
        return res.status(400).json(response)
    }

})

routes.post("/signin", async(req,res)=>{
    let body = req.body
    let result = await User.findOne({
        email:body.email,
    })
    if(!result){
        let response = responseBody(user_data_not_found,RESPONSE_STATUS_FAILURE)
        return res.status(200).json(response)
    }
    // check password is correct 
    const hash = crypto.createHash('sha256',process.env.HASH_SECERT_KEY).update(body.password).digest("hex")
    if(hash === result.password){
        let accessToken = jwt.sign({fullName:result.fullName,email:result.email,_id:result._id},process.env.JSON_SECERT_KEY,{expiresIn : ACCESS_EXPIRY_TIME})
        let refreshToken = jwt.sign({fullName:result.fullName,email:result.email,_id:result._id},process.env.JSON_SECERT_KEY,{expiresIn : REFRESH_EXPIRY_TIME})
        let response = responseBody(login_successfully,RESPONSE_STATUS_SUCCESS,{"accessToken":accessToken,"refreshToken":refreshToken})
        return res.status(200).json(response)
    }
    else {
        let response = responseBody(invalid_password,RESPONSE_STATUS_FAILURE)
        return res.status(200).json(response)
    }
})





module.exports = routes