import React from 'react'
import "./Header.css"
import { motion } from 'framer-motion'

const Header = () => {
  return (
    <div className='header'>
      <div className='header-content'>
        <motion.h2 className="headline" animate={{scale:[null,1]}} transition={{ease:"circInOut",duration:2}}>Order your favourite food here</motion.h2>
        <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quidem quae doloremque tempora commodi sit excepturi eum nemo, incidunt dicta, consequatur fugiat soluta? Ex ducimus asperiores voluptatibus explicabo assumenda dolorum sed.</p>
        <motion.button whileHover={{scale:[null,1.1]}} className='view-button'>View Menu</motion.button>
      </div>
    </div>
  )
}

export default Header
