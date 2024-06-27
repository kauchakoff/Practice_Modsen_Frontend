import React, { useState, useEffect } from 'react';
import {BrowserRouter as Router, Route, Routes, Navigate, BrowserRouter} from 'react-router-dom';
import Products from '../../../components/Products/Products';
import Login from '../../../components/Login/Login';
import Register from '../../../components/Register/Register';
import { checkAuthStatus } from '../../auth/auth';
import './AppRouterProvider.module.css';
import Cart from "../../../components/Cart/Cart";
import Orders from "../../../components/Orders/Orders";
import Layout from "../../../components/Layout/Layout";

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
            <Route path="orders" element={<Orders/>}></Route>
            <Route path="cart" element={<Cart/>}/>
            <Route path="products" element={<Products/>}  />
            <Route path="" element = {user ? <Products setUser={setUser} /> : <Navigate to="login"/>} />
            <Route path="login" element = {user ? <Navigate to="" /> : <Login setUser={setUser} />}/>
            <Route path="register" element = {user ? <Navigate to="/" /> : <Register setUser={setUser} />}/>
          </Route>
        </Routes>
      </BrowserRouter>
  );
};



export default AppRouterProvider;
