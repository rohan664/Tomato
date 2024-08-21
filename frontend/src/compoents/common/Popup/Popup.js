import React, { useEffect } from 'react'
import { AiOutlineClose } from "react-icons/ai";
import "./Popup.css"

const Popup = ({message}) => {
    useEffect(()=>{
        console.log("popup compent is mount")
    },[])
  return (
    <div className='popup'>
        <div className='popup-container'>
            <div className='close-icon'>
                <AiOutlineClose />
            </div>
            <div className='popup-message'>
                <p>{message}</p>
            </div>
        </div>
    </div>
  )
}

export default Popup
