import { createContext, useEffect, useState } from "react";
import { food_list } from "../assets/assets";
import { cartItems} from "../recoil/atoms";
import {useRecoilState} from "recoil"

export const StoreContext = createContext(null)

export const StoreConetextProvider = (props) => {

    // state
    // const[cartItem,setCartItem] = useState({})
    const [isLogin,setIsLogin] = useState(false)

    // recoil state
    const [cartItem, setCartItem] = useRecoilState(cartItems)
    

    const addToCart = (itemId) => {
        if(!cartItem[itemId]){
            setCartItem((prev)=>({...prev,[itemId]:1}))
        }
        else {
            setCartItem((prev)=>({...prev,[itemId]:prev[itemId] + 1}))
        }
    }

    const removeFromCart = (itemId) => {
        setCartItem((prev)=>({...prev,[itemId]:prev[itemId]-1}))
        if(cartItem[itemId] === 1){
            const {[itemId]:_ , ...newObj} = cartItem
            setCartItem(newObj)
        }
    }

    useEffect(()=>{
        console.log(cartItem)
    },[cartItem])

    useEffect(()=>{
        let accessToken = localStorage.getItem("accessToken")
        if(accessToken){
            setIsLogin(!isLogin)
        }
    },[])

    const contextValue = {
        food_list,
        addToCart,
        removeFromCart,
        cartItem,
        setCartItem,
        isLogin,
        setIsLogin
    }
    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}
