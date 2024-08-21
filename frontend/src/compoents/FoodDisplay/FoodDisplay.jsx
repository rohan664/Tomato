import React, { useContext } from 'react'
import "./FoodDisplay.css"
import { StoreContext } from '../../context/StoreContext'
import FoodItem from '../FoodItem/FoodItem'

const FoodDisplay = ({category}) => {
    const {food_list} = useContext(StoreContext)

  return (
    <div className='food-display' id='food-display'>
      <h1>Top Dishes Near You</h1>
      <div className='food-list'>
        {food_list.map((item,index)=>{
            if(category === 'All' || category.toLowerCase() === item.category.toLowerCase()){
                return (
                    <FoodItem key={index} id={item._id} name={item.name} price={item.price} descriptions={item.description} image={item.image}/>
                )
            }
        })}
      </div>
    </div>
  )
}

export default FoodDisplay
