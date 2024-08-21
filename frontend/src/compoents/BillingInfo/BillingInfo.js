import React, { useContext, useEffect, useState } from 'react'
import "./BillingInfo.css"
import {assets , food_list} from "../../assets/assets"
import { StoreContext } from '../../context/StoreContext'
import { orderItems } from '../../recoil/atoms'
import { useRecoilState } from 'recoil'
import {errorToast,successToast} from "../../toast/index"
import {SOMETHING_WENT_WRONG} from "../../constants/constants"
import {getApiResponse} from "../../constants/utilis"
import {placeOrder} from "../../constants/config"
import { useNavigate } from 'react-router-dom'

const BillingInfo = () => {

  const navigate = useNavigate()
  const {cartItem, addToCart, removeFromCart, setCartItem,isLogin} = useContext(StoreContext)
  const [order, setOrder] = useRecoilState(orderItems)
  const[object, setObject] = useState([])
  const[total, setTotal] = useState(0)

  useEffect(()=>{
    setOrder([])
    setObject(Object.keys(cartItem))
    let sum = 0
    food_list.map((value)=>{
      if(object.includes(String(value._id))){
        sum = sum + value.price * cartItem[value._id]
        setOrder((old)=>[...old,{...value,quantity:cartItem[value._id]}])
      }
    })
    setTotal(sum)
  },[cartItem])

  async function Order() {
      let body = {
        amount:total,
        order:order
      }
      console.log(body)
      let response = await getApiResponse(placeOrder,body,"POST")
      if(response){
        console.log(response)
          if(response.status === 1){
              window.location.replace(response.data.session_url)
              setCartItem({})
              setObject([])
          }
          else {
              window.location.replace(response.data.session_url)
              setCartItem({})
              setObject([])
          }
      }
      else{
          errorToast(SOMETHING_WENT_WRONG)
      }
    }
  
  return (

    <div className='billing'>
        <div className='info'>
            <h3>Billing Information</h3>
        </div>
        <div className='scroll'>
          <div className='billing-items'>
            { 
              food_list.map((value,index)=>{
                if(object.includes(String(value._id))){
                  return(
                    <div className='billing-container' key={index}>
                      <div className='items'>
                        <div className='item-descriptions'>
                          <img src={value.image} alt='sandwich' className='item-image'/> 
                          <div className='item-information'>
                            <h4>{value.name}</h4>
                            <p>{value.description}</p>
                            <div className='food-item-counter-billing'>
                              <img onClick={()=>{removeFromCart(value._id)}} src={assets.remove_icon_red} alt='counter' className='counter-icon'/>
                              <p>{cartItem[value._id]}</p>
                              <img onClick={()=>{addToCart(value._id)}} src={assets.add_icon_green} alt='counter'/>
                            </div>
                          </div>
                          
                        </div>
                        <div className='price'>
                            <p>${value.price * cartItem[value._id]}</p>
                        </div>
                      </div>
                   </div>
                  )
                }
              })
            }
          </div>
        </div>
        <div className='total-div'>
            {object.length > 0 ? 
            <div className='total'>
              <h4>Total</h4>
              <p>${total}</p>
            </div> : <></>}
            {isLogin  && object.length > 0 ? <div className='place-order-button'>
              <button className='place_order' onClick={()=>{Order()}}>Place order</button>
            </div> : <></>}
        </div>
    </div>
  )
}

export default BillingInfo
