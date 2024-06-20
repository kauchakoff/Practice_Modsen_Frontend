import React, { useState, useEffect } from 'react';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
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

  const router = createBrowserRouter([
    {
      path: "/",
      element: user ? <Home setUser={setUser} /> : <Navigate to="/login" />,
    },
    {
      path: "/login",
      element: user ? <Navigate to="/" /> : <Login setUser={setUser} />,
    },
    {
      path: "/register",
      element: user ? <Navigate to="/" /> : <Register setUser={setUser} />,
    },
  ]);

  return <RouterProvider router={router} />;
};

export default AppRouterProvider;
