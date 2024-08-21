const {responseBody} = require("../constants/commonFunction")
const {token_is_expired, invalid_token} = require("../constants/message")
const {RESPONSE_STATUS_FAILURE,RESPONSE_STATUS_SUCCESS} = require("../constants/constants")
const jwt = require("jsonwebtoken")
require("dotenv").config()

function checkExpiryTime(){
   return (req,res,next) => {
        let authorizations = req.headers.authorization
        let accessToken = authorizations.split("Bearer ")[1]
        jwt.verify(accessToken,process.env.JSON_SECERT_KEY,(err,decode)=>{
            if(err){
                if(err.name == "TokenExpiredError"){
                    let response = responseBody(token_is_expired,RESPONSE_STATUS_FAILURE)
                    return res.status(200).json(response)
                }
                else {
                    let response = responseBody(invalid_token,RESPONSE_STATUS_FAILURE)
                    return res.status(200).json(response)
                }
            }
            req.user = decode   
            next()
        })
        
   }
}

module.exports = {
    checkExpiryTime
}