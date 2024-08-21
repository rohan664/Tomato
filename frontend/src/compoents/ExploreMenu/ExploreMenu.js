import React from 'react'
import "./ExploreMenu.css"
import { menu_list } from '../../assets/assets'

const ExploreMenu = ({category,setCategory}) => {
  return (
    <div className='explore-menu' id='explore-menu'>
        <h1>Explore Our Menu</h1>
        <p className='explore-menu-text'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quidem quae doloremque tempora commodi sit excepturi eum nemo, incidunt dicta, consequatur fugiat soluta? Ex ducimus asperiores voluptatibus explicabo assumenda dolorum sed.</p>
        <div className='explore-menu-list'>
            {menu_list.map((item,index)=>{
                return (
                    <div onClick={()=>setCategory(prev=>prev===item.menu_name ? "All" : item.menu_name)} key={index} className='explore-menu-list-item'>
                        <img className={item.menu_name === category ? "active" : ""} src={item.menu_image} alt='icon'/>
                        <p>{item.menu_name}</p>
                    </div>
                )
            })}
        </div>
        <hr/>
    </div>
  )
}

export default ExploreMenu
