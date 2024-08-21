import React, { useContext, useEffect, useState } from 'react'
import "./LoginPopup.css"
import { slider , assets } from '../../assets/assets'
import {getApiResponse} from "../../constants/utilis"
import { createUser, authenticateUser } from "../../constants/config"
import {SOMETHING_WENT_WRONG} from "../../constants/constants"
import {errorToast , successToast} from "../../toast/index"
import { VscEye } from "react-icons/vsc";
import { VscEyeClosed } from "react-icons/vsc";
import { useNavigate } from "react-router-dom"
import { StoreContext } from '../../context/StoreContext'


const LoginPopup = () => {
    const navigate = useNavigate()
    const {setIsLogin , isLogin} = useContext(StoreContext)
    const [currentState , setCurrentState] = useState("Sign Up")
    const [showPassword, setShowPassword] = useState(false)
    const [currentIndex ,  setCurrentIndex] = useState(1)
    const [obj, setObj] = useState(slider[0])
    const [name, setName] = useState({
        value : "",
        placeholder : "Your Name",
        errorMessage : false
    })
    const [email, setEmail] = useState({
        value : "",
        placeholder : "Your Email",
        errorMessage : false 
    })
    const [password, setPassword] = useState({
        value : "",
        placeholder : "Your Password",
        errorMessage : false
    })

    useEffect(()=>{
        const interval = setInterval(()=>{
            setObj(slider[currentIndex])
            if(currentIndex === slider.length - 1) {
                setCurrentIndex(0)
            }
            else {
                setCurrentIndex(currentIndex + 1)
            }
        },5000) 
        return () => clearInterval(interval);
       
    },[obj])

    async function registerUser(){
        if(!name.value){
            setName({...name,placeholder:"Please Enter Your Name",errorMessage:true})
        }
        else if(!email.value){
            setEmail({...email,placeholder:"Please Enter Your Email",errorMessage:true})
        }
        else if(!password.value){
            setPassword({...password,placeholder:"Please Enter Your Password",errorMessage:"true"})
        }
        else{
            let body = {
                fullName : name.value,
                email : email.value,
                password : password.value
            }
            let response = await getApiResponse(createUser,body,"POST")
            if(response){
                if(response.status === 1){
                    successToast(response.message)
                    setCurrentState("Login")
                    setName({value : "", placeholder : "Your Name", errorMessage : false})
                    setEmail({value : "", placeholder : "Your Email", errorMessage : false })
                    setPassword({value : "", placeholder : "Your Password", errorMessage : false})
                }
                else {
                    errorToast(response.message)
                }
            } else {
                errorToast(SOMETHING_WENT_WRONG)
            }
        }
    }

    async function loginUser(){
        if(!email.value){
            setEmail({...email,placeholder:"Please Enter Your Email",errorMessage:true})
        }
        else if(!password.value){
            setPassword({...password,placeholder:"Please Enter Your Password",errorMessage:true})
        }
        else {
            let body = {
                email : email.value,
                password : password.value
            }
            let response = await getApiResponse(authenticateUser,body,"POST")
            if(response){
                if(response.status === 1){
                    setIsLogin(!isLogin)
                    localStorage.setItem("accessToken",response.data.accessToken)
                    localStorage.setItem("refreshToken",response.data.refreshToken)
                    successToast(response.message)
                    navigate(-1)
                }
                else {
                    errorToast(response.message)
                }
            }
            else{
                errorToast(SOMETHING_WENT_WRONG)
            }
        }
    }

  return (
    <div className='login-popup'>
        <div className='login-popup-container'>
            <div className='login-inner-popup'>
                <div className='slider'>
                    <div className='slider-information'>
                        <h2>{obj.title}</h2>
                        <p>{obj.description}</p>
                    </div>
                    <img src={obj.img} alt='slider' loading='lazy'/>
                </div>
            </div>
            <div className='login-foem'>
                    <div className='welcome-info'>
                        <h2>Welcome Foodie,</h2>
                    </div>
                    <div className='login-container'>
                        <form className='login-form'>
                           {currentState === "Sign Up" ?  
                            <input type='text' className={name.errorMessage ? "input-error" : ""} onChange={(e)=>{setName({...name,value:e.target.value,errorMessage:false,placeholder:"Your Name"})}}   placeholder={name.placeholder} value={name.value} required /> 
                            : <></>
                            }
                            <input type='email' className={email.errorMessage ? "input-error" : ""} onChange={(e)=>{setEmail({...email,value:e.target.value,errorMessage:false,placeholder:"Your Email"})}} placeholder={email.placeholder} value={email.value} required/>
                            <div className={password.errorMessage ? "input-error-password" : "password-input"}>
                                <input type={showPassword ? 'text' : "password"}  onChange={(e)=>{setPassword({...password,value:e.target.value,errorMessage:false,placeholder:"Your Password"})}} placeholder={password.placeholder} value={password.value} required/>
                                {showPassword ? <VscEye onClick={()=>{setShowPassword(!showPassword)}}/> : <VscEyeClosed onClick={()=>{setShowPassword(!showPassword)}}/>}
                            </div>
                            
                        </form>
                        <button className='login-button' onClick={()=>{currentState === "Sign Up" ? registerUser() : loginUser()}}>{currentState === "Sign Up" ? "Create Account" : "Login"}</button>
                        <div className='form-condition'>
                            <input type='checkbox'/>
                            <p className='declamier'>You are agree with term and condition.</p>
                        </div>
                        <div className='login-and-register-condition'>
                            {currentState === "Sign Up" ? <p>Already account ? <span onClick={()=>{setCurrentState("Login")}}>Sign In</span></p> : 
                            <p>Do not have account ? <span onClick={()=>{setCurrentState("Sign Up")}}>Register now</span></p>}
                        </div>
                    </div>
            </div>
        </div>
    </div>
  )
}

export default LoginPopup
