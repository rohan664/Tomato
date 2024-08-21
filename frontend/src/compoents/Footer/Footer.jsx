import React from 'react'
import "./Footer.css"
import { assets } from '../../assets/assets'

const Footer = () => {
  return (
    <div className='footer' id='footer'>
       <div className="footer-content">
        <div className="footer-content-left">
            <img src={assets.logo}/>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur eos est suscipit, hic eius dolore similique sit eligendi non possimus incidunt doloremque minima? Inventore, assumenda? Dolor aperiam iusto odio sapiente!</p>
            <div className='footer-social-icons'>
                <img src={assets.facebook_icon} alt='social'/>
                <img src={assets.twitter_icon} alt='social'/>
                <img src={assets.linkedin_icon} alt='social'/>
            </div>
        </div>
        <div className="footer-content-center">
            <h2>Company</h2>
            <ul>
                <li>Home</li>
                <li>About us</li>
                <li>Delivery</li>
                <li>Privacy policy</li>
            </ul>
        </div>
        <div className="footer-content-right">
            <h2>Get In Touch</h2>
            <ul>
                <li>+91 9324472762</li>
                <li>rohandesai664@gmail.com</li>
            </ul>
        </div>
       </div>
       <hr/>
       <p className='footer-copyright'>Copyright 2024 @ Tomato.com - All Right Reserved</p>
    </div>
  )
}

export default Footer
