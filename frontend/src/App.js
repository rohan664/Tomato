import './App.css';
import Navbar from './compoents/Navbar/Navbar';
import { Route, Routes } from 'react-router-dom';
import Footer from './compoents/Footer/Footer';
import LoginPopup from './compoents/LoginPopup/LoginPopup';
import { useLocation } from 'react-router-dom';
import { Suspense, lazy, useState } from 'react';

const Home = lazy(()=>import("./pages/Home/Home"))
const Cart = lazy(()=>import("./pages/Cart/Cart"))
const PlaceOrder = lazy(()=>import("./pages/PlaceOrder/PlaceOrder"))
// const LoginPopup = lazy(()=>{import('./compoents/LoginPopup/LoginPopup')})



function App() {

  const location = useLocation()
  const pathName = location.pathname
  const[category, setCategory] = useState("All")
  const [menu, setMenu] = useState("")
  const[hideNavItems, setHideNavItems] = useState(false)

  

  return (
    <>
    <div className="App">
      {pathName !== "/login"? <Navbar setCategory={setCategory} menu={menu} setMenu={setMenu} hideNavItems={hideNavItems}/> : <></>}
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/cart' element={<Cart setMenu={setMenu} setHideNavItems={setHideNavItems}/>}/>
          <Route path='/PlaceOrder' element={<PlaceOrder setHideNavItems={setHideNavItems}/>}/>
          <Route path='/login' element={<LoginPopup/>}/>
          <Route path='*'element={<Home/>}/>
        </Routes>
      </Suspense>
    </div>  
    {pathName !== "/login" ? <Footer/> :<></>}
    </>
  );
}

export default App;
