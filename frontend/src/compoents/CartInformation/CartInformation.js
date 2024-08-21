import React, { useContext} from 'react'
import "./CartInformation.css"
import { Link } from 'react-router-dom'
import { StoreContext } from '../../context/StoreContext'

const CardInformation = () => {
  const { cartItem } = useContext(StoreContext)

  return (
      Object.keys(cartItem).length > 0 ? 
      <div className='cart-info'> 
        <div className='cart-info-cont'>
          <div className='items-count'>
              <p><span className='cart-number'>{Object.keys(cartItem).length} </span> items added</p>
          </div>
          <div className='cart-link'>
              <Link to="/cart"><p>view card</p></Link>
          </div>
        </div>
      </div> 
      : <></>
  )
}

export default CardInformation
