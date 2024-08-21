import React, { useContext, useEffect, useState } from 'react'
import "./CartDetails.css"
import { assets } from '../../assets/assets'
import { FaUser } from "react-icons/fa";
import { FaMapMarkerAlt } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import {jwtDecode} from "jwt-decode"
import { StoreContext } from '../../context/StoreContext';
import { getApiResponse } from '../../constants/utilis';
import { addAddress, getUserAddress, userEditAddress } from '../../constants/config';
import { errorToast, successToast } from '../../toast';
import { SOMETHING_WENT_WRONG } from '../../constants/constants';

const CartDetails = () => {
    const alphaNumericValue = /^[a-zA-Z0-9/., ]*$/
    const navigate = useNavigate()
    const {setIsLogin,isLogin} = useContext(StoreContext)
    const [userInfo,setUserInfo] = useState({})
    const [addressInfo,setAddressInfo] = useState({})
    const [isEditButtonEnable, setIsEditButtonEnable] = useState(true)
    const [streetAddress, setStreetAddress] = useState({
        value : "",
        errorMessage : false,
        placeholder : "Street Address"
    })
    const [pinCode , setPinCode] = useState({
        value : "",
        errorMessage : false,
        placeholder : "Pincode"
    })
    const [apartment,setApartment] = useState({
        value :"",
        placeholder : "Apt, suite, etc",
        errorMessage : false,
    })
    const [landMark,setLandMark] = useState({
        value : "",
        placeholder : "Landmark (Optional)",
        errorMessage : false,
    })
    const [city, setCity] = useState({
        value : "",
        placeholder:"City",
        errorMessage : false,
    })
    const [country,setCountry] = useState({
        value:"",
        placeholder : "Country",
        errorMessage : false
    })

    useEffect(()=>{
        let accessToken = localStorage.getItem("accessToken")
        if(!accessToken) {
            setIsLogin(isLogin)
        }
        else {
            let userInfo = jwtDecode(accessToken)
            setUserInfo(userInfo)
            setIsLogin(true)
            getAddress()
        }
    },[])

    async function saveAddress() {
        if(!streetAddress.value){
            setStreetAddress({...streetAddress,placeholder:"Please Enter Street Address",errorMessage:true})
        }
        else if(!pinCode.value){
            setPinCode({...pinCode,placeholder:"Please Enter pincode Number",errorMessage:true})
        }
        else if(!apartment.value){
            setPinCode({...pinCode,placeholder:"Please Enter Pincode",errorMessage:true})
        }
        else if(!city.value){
            setCity({...city,placeholder:"Please Enter City",errorMessage:true})
        }
        else if(!country.value){
            setCountry({...country,placeholder:"Please Enter Country",errorMessage:true})
        }
        else {
            let body = {
                streetAddress : streetAddress.value,
                pinCode : pinCode.value,
                apartment : apartment.value,
                landMark : landMark.value,
                city : city.value,
                country : country.value
            }
            let response = await getApiResponse(addAddress,body,"POST")
            if(response){
                if(response.status === 1){
                   successToast(response.message)
                }
                else {
                    if(response.message === "Token is expired"){
                        navigate("/login")
                    }
                    errorToast(response.message)
                }
            }
            else{
                errorToast(SOMETHING_WENT_WRONG)
            }
        }
    }

    async function getAddress(){
        let response = await getApiResponse(getUserAddress,{},"GET")
        if(response){
            if(response.status === 1){
                setAddressInfo(response.data)
                setStreetAddress({...streetAddress,value:response.data.streetAddress})
                setPinCode({...pinCode,value:response.data.pinCode})
                setApartment({...apartment,value:response.data.apartment})
                setLandMark({...landMark,value:response.data.landMark})
                setCity({...city,value:response.data.city})
                setCountry({...country,value:response.data.country})
            }
            else{
                if(response.message === "Token is expired"){
                    navigate("/login")
                }
                errorToast(response.message)
            }
        }
        else  {
            errorToast(SOMETHING_WENT_WRONG)
        }
    }

    async function editAddress() {  
        if(!streetAddress.value){
            setStreetAddress({...streetAddress,placeholder:"Please Enter Street Address",errorMessage:true})
        }
        else if(!pinCode.value){
            setPinCode({...pinCode,placeholder:"Please Enter pincode Number",errorMessage:true})
        }
        else if(!apartment.value){
            setPinCode({...pinCode,placeholder:"Please Enter Pincode",errorMessage:true})
        }
        else if(!city.value){
            setCity({...city,placeholder:"Please Enter City",errorMessage:true})
        }
        else if(!country.value){
            setCountry({...country,placeholder:"Please Enter Country",errorMessage:true})
        }
        else {
            let body = {
                streetAddress : streetAddress.value,
                pinCode : pinCode.value,
                apartment : apartment.value,
                landMark : landMark.value,
                city : city.value,
                country : country.value
            }
            let response = await getApiResponse(userEditAddress,body,"POST")
            if(response){
                if(response.status === 1){
                    successToast(response.message)
                }
                else{
                    errorToast(response.message)
                }
            }   
            else{
                errorToast(SOMETHING_WENT_WRONG)
            }
        }
    }

    function onPincodChange(value){
        
    }
  return (
    <div className='cart-details'>
        <div className='account-info'>
            <div className='account-icon'>
              <FaUser />
            </div>
            <div className='account'>
               { !isLogin ? 
                <>
                    <div className='account-warning'>
                        <h3>Account</h3>
                        <p>To place your order now, log in to your existing account or sign up.</p>
                    </div>
                    <div className='button'>
                        <Link to="/login"><div className='login'>Have an account? <br/>LOG IN</div></Link>
                        <Link to="/login"><div className='signup'>New to Tomato? <br/>SIGN UP</div></Link>
                    </div>
                </> :
                <>  
                    <h3>Account</h3>
                    <div className='user-info'>
                        <div className='user-info-1'>
                            <input placeholder='Your Full Name' type='text' value={userInfo.fullName} readOnly/>
                            <input placeholder='Your Username' type='text' value={userInfo.username} readOnly/>
                            <input placeholder='Your Email' type='email' value={userInfo.email} readOnly/>
                        </div>
                    </div>
                </> 
                }
            </div>
            <div className='account-img'>
                <img src={assets.frankie} alt='frankie'/>
            </div>
        </div>
        <div className='account-info'>
            <div className='account-icon'>
                <FaMapMarkerAlt />
            </div>
            <div className='account'>
               { !isLogin ? 
                <>
                    <div className='account-warning'>
                        <h3>Address</h3>
                    </div>
                </> :
                <>  
                    <h3>Address</h3>
                    <div className='user-info'>
                        <div className='user-info-1'>
                            <input className={streetAddress.errorMessage ? "input-error" : ""} placeholder={streetAddress.placeholder} type='email' value={streetAddress.value} onChange={(e)=>{
                                if(alphaNumericValue.test(e.target.value)){
                                    setStreetAddress({...streetAddress,value:e.target.value,errorMessage:false});
                                    setIsEditButtonEnable(false)
                                }
                            }}/>
                            <input className={pinCode.errorMessage ? "input-error" : ""} placeholder={pinCode.placeholder} type='text' value={pinCode.value} onChange={(e)=>{
                                if(alphaNumericValue.test(e.target.value)){
                                    setPinCode({...pinCode,value:e.target.value,errorMessage:false});
                                    setIsEditButtonEnable(false)
                                }
                            }}/> 
                            <input className={apartment.errorMessage ? "input-error" : ""} placeholder={apartment.placeholder} type='text' value={apartment.value} onChange={(e)=>{
                                if(alphaNumericValue.test(e.target.value)){
                                    setApartment({...apartment,value:e.target.value,errorMessage:false});
                                    setIsEditButtonEnable(!isEditButtonEnable)
                                    }
                                }}/>
                            <input className={landMark.errorMessage ? "input-error" : ""} placeholder={landMark.placeholder} type='text' value={landMark.value} onChange={(e)=>{
                                if(alphaNumericValue.test(e.target.value)){
                                    setLandMark({...landMark,value:e.target.value,errorMessage:false});
                                    setIsEditButtonEnable(!isEditButtonEnable)
                                    }
                                }}/>
                            <input className={city.errorMessage ? "input-error" : ""} placeholder={city.placeholder} type='text' value={city.value} onChange={(e)=>{
                                if(alphaNumericValue.test(e.target.value)){
                                    setCity({...city,value:e.target.value,errorMessage:false});
                                    setIsEditButtonEnable(!isEditButtonEnable)
                                    }
                                }}/>
                            <input className={country.errorMessage ? "input-error" : ""} placeholder={country.placeholder} type='text' value={country.value} onChange={(e)=>{
                                if(alphaNumericValue.test(e.target.value)){
                                    setCountry({...country,value:e.target.value,errorMessage:false});
                                    setIsEditButtonEnable(!isEditButtonEnable)
                                    }
                                }}/>
                        </div>
                        { addAddress ? 
                            <div className='address-button'>
                                <button onClick={()=>{editAddress()}} disabled={isEditButtonEnable}>Edit Address</button>
                            </div> 
                            : 
                            <div className='address-button'>
                                <button onClick={()=>{saveAddress()}}>Save Address</button>
                            </div>
                        }
                    </div>
                </> 
                }
            </div>
            <div className='account-img'>
                {isLogin ? <img src={assets.address} alt='address' className='address-img'/> : <></>}
            </div>
        </div>
    </div>
  )
}

export default CartDetails
