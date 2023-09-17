import React, { useEffect, useState } from 'react';
import { Navigate  } from 'react-router-dom';

const Auth = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const checkUserAuth = (token)=>{
    // Check if the user has a valid token here
    if (token) {
      setIsAuthenticated((prev)=> true);
    } else {
      setIsAuthenticated((prev)=> false);
    }
  }

  useEffect(() => {
    const token = localStorage.getItem('token'); // You can replace this with your actual token validation logic

    console.log("before",isAuthenticated,token)
    checkUserAuth(token);
    console.log("after",isAuthenticated,token)
  },[isAuthenticated]);

  useEffect(()=>{
    console.log("Second use effect")
  },[isAuthenticated]);

  return isAuthenticated ? children : <Navigate  to="/admin/login" />;
};

export default Auth;
