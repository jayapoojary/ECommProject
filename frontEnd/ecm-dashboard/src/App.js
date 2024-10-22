import './App.css';
import React, {useState, useEffect} from 'react';
import { getProductsList } from './Redux2/User/operations';
import Nav from './Header/Nav';
import Home from './Home/Home';
import { Routes, Route } from 'react-router-dom';
import Footer from './Footer/Footer';
import SignUP from './Signup/SignUP';
import PrivateComponent from './PrivateComponent/PrivateComponent';
import Login from './Login/Login';
import AddProduct from './AddProduct/AddProduct';
import { useDispatch } from 'react-redux';
import Products from './ProductsList/Products';
import UpdateProduct from './ProductsList/Update/UpdateProduct';
import Profile from './Profile/Profile';
import EditUser from './Profile/EditUser';
function App() {

  const dispatch = useDispatch();
    useEffect(() => {
    dispatch(getProductsList());
  });

  return (
    <div className="App">
      <Nav />
      <Routes>
        <Route  element={<PrivateComponent />} >
        <Route path='/' Component={Products}/>
        <Route path='/add' element={<AddProduct />}/>
        <Route path='/update/:id' element={<UpdateProduct />}/>
        <Route path='/logout' element={<p>Logout</p>}/>
        <Route path='/profile' element={<Profile />}/>
        <Route path='/editProfile/:id' element={<EditUser />} />
        </Route>
        <Route path='/signup' element={<SignUP />}/>
        <Route path='/login' element={<Login />}/>
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
