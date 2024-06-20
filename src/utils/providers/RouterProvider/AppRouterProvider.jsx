import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Home from '../../../components/Home/Home';
import Login from '../../../components/Login/Login';
import Register from '../../../components/Register/Register';
import { checkAuthStatus } from '../../auth/auth';

import './AppRouterProvider.css';

const AppRouterProvider = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const user = checkAuthStatus();
    setUser(user);
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element = {user ? <Home setUser={setUser} /> : <Navigate to="/login"/>} />
        <Route path="/login" element = {user ? <Navigate to="/" /> : <Login setUser={setUser} />}/>
        <Route path="/register" element = {user ? <Navigate to="/" /> : <Register setUser={setUser} />}/>
      </Routes>
    </Router>
  );
};



export default AppRouterProvider;
