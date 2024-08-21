import React, { useState } from 'react'
import "./Home.css"
import Header from '../../compoents/Header/Header'
import ExploreMenu from '../../compoents/ExploreMenu/ExploreMenu'
import FoodDisplay from '../../compoents/FoodDisplay/FoodDisplay'
import AppDownload from '../../compoents/AppDownload/AppDownload'
import CardInformation from '../../compoents/CartInformation/CartInformation'


const Home = () => {

  const[category, setCategory] = useState("All")

  return (
    <>
      <div className='box'>
        {/* <Navbar setCategory={setCategory}/> */}
        <Header/>
        <CardInformation/>
        <ExploreMenu category={category} setCategory={setCategory}/>
        <FoodDisplay category={category}/>
        <AppDownload/>
      </div>
      {/* <Footer/> */}
    </>
  )
}

export default Home
