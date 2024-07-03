import React, {useState, useEffect, useRef} from 'react';
import {BrowserRouter as Router, Route, Routes, Navigate, BrowserRouter} from 'react-router-dom';
import Login from '../../../components/Login/Login';
import Register from '../../../components/Register/Register';
import { checkAuthStatus } from '../../auth/auth';
import './AppRouterProvider.module.css';
import Cart from "../../../components/Cart/Cart";
import Orders from "../../../components/Orders/Orders";
import Layout from "../../../components/Layout/Layout";
import Products from "../../../components/Products/Products";
import CategoryEditor from "../../../components/Categories/CategoryEditor";

const AppRouterProvider = () => {
  const [user, setUser] = useState(null);


  useEffect(() => {
    const user = checkAuthStatus();
    setUser(user);
  }, []);


  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout/>}>
            <Route path="orders" element={checkAuthStatus() ?<Orders userId={localStorage.getItem("userId")}/>: <Navigate to="/login"/>}/>
            <Route path="cart" element={checkAuthStatus() ? <Cart/> : <Navigate to="/login"/>}/>
            <Route path="categories" element={checkAuthStatus() && localStorage.getItem("role") === "[ADMIN]" ? <CategoryEditor/> : <Navigate to="/login"/>}  />
            <Route path="products" element = {checkAuthStatus() ? <Products /> : <Navigate to="/login"/>} />
            <Route path="login" element = {checkAuthStatus() ? <Navigate to="/products" /> : <Login setUser={(user)=> setUser(user) }/>}/>
            <Route path="register" element = {checkAuthStatus() ? <Navigate to="/products" /> : <Register  setUser={(user)=> setUser(user) } />}/>
          </Route>
        </Routes>
      </BrowserRouter>
  );
};



export default AppRouterProvider;
