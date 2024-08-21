import React, { Suspense, lazy, useEffect } from 'react'
import "./Cart.css"

const BillingInfo = lazy(()=>import("../../compoents/BillingInfo/BillingInfo"))
const CartDetails = lazy(()=>import("../../compoents/CartDetails/CartDetails"))

const Cart = ({setMenu,setHideNavItems}) => {

  useEffect(()=>{
    setMenu("")
    setHideNavItems(true)
  },[])

  return (
    <>
      <div className='cart-box'>
      <Suspense fallback={<div>Loading....</div>}>
        <CartDetails/>
        <BillingInfo/>
      </Suspense>
      </div>
    </>
  )
}

export default Cart
