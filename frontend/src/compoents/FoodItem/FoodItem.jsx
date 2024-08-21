import React, { useContext, useState } from 'react'
import "./FoodItem.css"
import { assets } from '../../assets/assets'
import { StoreContext } from '../../context/StoreContext'
import Popup from "../common/Popup/Popup"

const FoodItem = ({id,name,price,descriptions,image}) => {

    const {addToCart,removeFromCart,cartItem,setCartItem} = useContext(StoreContext)
    const [isLogin, setIsLogin] = useState(false)

    function addToCartOrShowPopup(id){
        let token = localStorage.getItem("accessToken")
        if(!token){
            setIsLogin(false)
        }
        else {
            addToCart(id)
        }
    }

  return (
    <>
    <div className='food-item'>
        <div className='food-item-image-container'>
            <img src={image} alt='food-item' className='food-item-img'/>
            {
                !cartItem[id] ? <img className='add' src={assets.add_icon_white} onClick={()=>{addToCart(id)}} alt='counter'/>:
                <div className='food-item-counter'>
                    <img onClick={()=>{removeFromCart(id)}} src={assets.remove_icon_red} alt='counter'/>
                    <p>{cartItem[id]}</p>
                    <img onClick={()=>{addToCart(id)}} src={assets.add_icon_green} alt='counter'/>
                </div>

            }
        </div>
        <div className='food-item-info'>
            <div className='food-item-name-rating'>
                <p>{name}</p>
                <img src={assets.rating_starts} alt='rating'/>
            </div>
            <p className="food-item-desc">{descriptions}</p>
            <p className="food-item-price">${price}</p>
        </div>
    </div>
    </>
  )
}

export default FoodItem
