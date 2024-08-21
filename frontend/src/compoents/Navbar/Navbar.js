import React, { useContext, useEffect, useState } from 'react'
import "./Navbar.css"
import {assets} from "../../assets/assets"
import { motion } from 'framer-motion'
import { Link} from 'react-router-dom'
import {jwtDecode} from "jwt-decode"
import { StoreContext } from '../../context/StoreContext'
import { useLocation } from 'react-router-dom'

function Navbar({setCategory,setMenu,menu,hideNavItems}) {

    const location = useLocation()
    const pathName = location.pathname
    
    const {setIsLogin,isLogin} = useContext(StoreContext)
    const [isUserLoggedIn, setIsUserLoggedIn] = useState(false)
    const [userInfo, setUserInfo] = useState({})
    const [showcard, setShowCard] = useState(false)
    const [searchText, setSearchText] = useState("")

    useEffect(()=>{
        const checkAccessToken = async () => {
            const accessToken = localStorage.getItem("accessToken");
            if (accessToken) {
                setIsUserLoggedIn(true);
                setUserInfo(jwtDecode(accessToken));
            }
        };  
        checkAccessToken();
    },[])

    function searchByText() {
        if(!searchText){
            setCategory("All")
        }
        setCategory(searchText)
        let section = document.getElementById("food-display")
        section.scrollIntoView({behavior:'smooth'})
        setSearchText("")
        
    }

    function onMouseEnter() {
        if(!searchText){
            setCategory("All")
        }
    }

    function logout() {
        localStorage.clear()
        setShowCard(!showcard)
        setIsUserLoggedIn(!isUserLoggedIn)
        setUserInfo({})
        setIsLogin(!isLogin)

    }

  return (
    <div className='navbar'>
        <img src={assets.logo} alt='logo'/>
        <ul className='navbar-list'>
            <Link to='/' className={menu === "home" ? "active" : "list"} onClick={()=>{setMenu("home")}}>Home</Link>
            <a className={hideNavItems ? "hide" : menu === "menu" ? "active" : "list"} onClick={()=>{setMenu("menu")}} href='#explore-menu'>Menu</a>
            <a className={hideNavItems ? "hide" : menu === "get-app" ? "active" : "list"} onClick={()=>{setMenu("get-app")}} href='#app-download'>Get App</a>
            <a className={menu === "contact" ? "active" : "list"} onClick={()=>{setMenu("contact")}} href='#footer'>Contact Us</a>
        </ul>
        <div className='navbar-right'>
            <div className='search-input'>
                <input type='text' placeholder='Search Here' onChange={(e)=>{setSearchText(e.target.value)}} value={searchText}/>
                <img src={assets.search_icon} alt='search' onClick={()=>{searchByText()}} onMouseEnter={()=>{onMouseEnter()}}/>
            </div>
            
            <div className='navbar-basket-icon'>
                <Link to="/Cart"><img src={assets.basket_icon} alt='basket' /></Link>
                <div className='dot'></div>
            </div>
            {   isUserLoggedIn ? 
                <div className='user-profile-container'>
                    <div className='user-profile-circle'>
                        <img src={assets.profile_icon} onClick={()=>{setShowCard(!showcard)}} alt='usericon'/>
                    </div>
                    <div className={showcard ? 'user-profile-card' : "hide-profile-card"}>
                        <div className='user'>
                            <div className='user-name-icon'>
                                <p>{userInfo.fullName.charAt(0).toUpperCase()}</p>
                            </div>
                            <div className='user-information'>
                                <h4>Foodie :</h4>
                                <p>{userInfo.fullName}</p>
                            </div>
                        </div>
                        <div className='logout-container' onClick={()=>{logout()}}>
                            <div className='logout'>
                                <img src={assets.logout_icon} alt='logout'/>
                                <p>Logout</p>
                            </div>
                        </div>
                    </div>
                </div>
                :
                <Link to="/login"><motion.button whileHover={{scale:[null,1.1]}} className='btn'>Sign Up</motion.button></Link>
            }
        </div>
    </div>
  )
}

export default Navbar
