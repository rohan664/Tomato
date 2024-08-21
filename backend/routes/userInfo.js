const Stripe = require("stripe")
const { responseBody } = require("../constants/commonFunction")
const userInfo = require("../model/userInfo")
const order = require("../model/order")
const {invalid_request, failed_to_save_address, save_address_successfully, address_retrive_successfully, address_not_saved, order_placed_successfully, something_went_wrong} = require("../constants/message")
const express = require("express")
const { RESPONSE_STATUS_FAILURE, RESPONSE_STATUS_SUCCESS } = require("../constants/constants")
const route = express.Router()

const stripe = new Stripe(process.env.STRIPE_SECERT_KEY)

route.post("/save-address",async(req,res)=>{
    const user = req.user
    if(!user){
        let response = responseBody(invalid_request,RESPONSE_STATUS_FAILURE)
        return res.status(404).json(response)
    }
    let body = req.body
    if(!body){
        let response = responseBody(invalid_request,RESPONSE_STATUS_FAILURE)
        return res.status(400).json(response)
    }
    let result = await userInfo.create({
        user:user._id,
        address : body
    })
    if(!result){
        let response = responseBody(failed_to_save_address,RESPONSE_STATUS_FAILURE)
        return res.status(401).json(response)
    }
    let response = responseBody(save_address_successfully,RESPONSE_STATUS_SUCCESS)
    return res.status(401).json(response)
})

route.get("/get-address",async(req,res)=>{
    let user = req.user
    let result = await userInfo.findOne({user:user._id})
    let response = responseBody(address_retrive_successfully,RESPONSE_STATUS_SUCCESS,result.address)
    return res.status(200).json(response)
})

route.post("/edit-address",async(req,res)=>{
    let body = req.body
    if(!body){
        let response = responseBody(invalid_request,RESPONSE_STATUS_FAILURE)
        return res.status(400).json(response)
    }
    let result = await userInfo.findOneAndUpdate({user:req.user._id},{$set:{address:body}})
    if(!result){
        let response = responseBody(address_not_saved,RESPONSE_STATUS_FAILURE)
        return res.status(400).json(response)
    }
    let response = responseBody(save_address_successfully,RESPONSE_STATUS_SUCCESS)
    return res.status(200).json(response)
    
})

route.post("/place-order",async(req,res)=>{
    const frontUrl = "http://localhost:3000/"
    try{
        let body = req.body
        let result = await order.create({
            user:req.user._id,
            amount:body.amount,
            order:body.order
        })

        const lineItem = req.body.order.map((item)=> ({
            price_data : {
                currency:"inr",
                product_data:{
                    name:item.name
                },
                unit_amount:item.price*100*80
            },
            quantity:item.quantity
        }))
        const session = await stripe.checkout.sessions.create({
            line_items:lineItem,
            mode:'payment',
            success_url:frontUrl,
            cancel_url:`${frontUrl}cart`
        })

        let respone = responseBody(order_placed_successfully,RESPONSE_STATUS_SUCCESS,{session_url:session.url})
        res.status(200).json(respone)
    }
    catch(error){
        console.log("place-oder",error)
        let respone = responseBody(something_went_wrong,RESPONSE_STATUS_FAILURE)
        res.status(400).json(respone)
    }
})

module.exports = route