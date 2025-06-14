import React, { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();

  const [authUser, setAuthUser] = useState(null);
  const [token, setToken] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [resume, setResume] = useState(null);


  

 const checkAuth = async () => {
    try {
      const res = await axios.get(`${`http://localhost:3001`}/api/check-auth`, {
        headers: {
          authorization: `Bearer ${token}`
        }
      });
      console.log(res.data)
      if (res.data.success === true) {
        setAuthUser(res.data.user);
      } else {
        setAuthUser(null);
        toast.error("Not authenticated");
        navigate("/");
      }
    } catch (error) {
      setAuthUser(null);
        setToken(null)
        toast.error("Not authenticated");
        navigate("/");
      // localStorage.removeItem("token");
      // setAuthUser(null);
      // setToken(null);
      // toast.error(error.message || "Authentication check failed");
      // navigate("/");
    }
  };

  // const handleAuthFailure = (message) => {
  //   localStorage.removeItem("token");
  //   setAuthUser(null);
  //   setToken(null);
  //   toast.error(message);
  //   navigate("/");
  // };

  const login = async (body, userType) => {
    try {
      const { data } = await axios.post(
        `${`http://localhost:3001`}/${userType}-login`,
        body
      );
      if (data.success) {
        setAuthUser(data.user);
        setToken(data.token);
        console.log("I am in login sucess page")
        localStorage.setItem("token1", data.token);
        console.log(data.token)
        axios.defaults.headers.common["authorization"] = `Bearer ${data.token}`;
        toast.success(data.message || "Login successfully");
      } else {
        toast.error(data.message || "Login Failed");
      }
    } catch (error) {
      toast.error(error.message || "Error occurred during Login");
    }
  };

  const signup = async (body, userType) => {
    try {
      const { data } = await axios.post(
        `${`http://localhost:3001`}/${userType}-signup`,
        body
      );
      if (data.success) {
        setAuthUser(data.user);
        setToken(data.token);
        localStorage.setItem("token1", data.token);
        axios.defaults.headers.common["authorization"] = `Bearer ${data.token}`;
        toast.success(data.message || "Account created successfully");
      } else {
        toast.error(data.message || "Signup failed");
      }
    } catch (error) {
      toast.error(error.message || "Error occurred during Signup");
    }
  };

  const logout = () => {
    localStorage.removeItem("token1");
    console.log('i a m in delete')
    delete axios.defaults.headers.common["authorization"];
    setAuthUser(null);
    setToken(null);
    toast.success("Logout successfully");
    navigate("/");
  };

  
useEffect(() => {
  const token1 = localStorage.getItem("token1");
  console.log("Token in localStorage: " + token1);

  if (token1) {
    setToken(token1);
  } else {
    navigate("/");
  }
}, []); 


useEffect(() => {
  if (token) {
    console.log("Token found: " + token);
    checkAuth();
  }
}, [token]); 


  const value = {
    signup,
    login,
    logout,
    authUser,
    setAuthUser,
    token,
    setToken,
    userProfile,
    setUserProfile,
    resume,
    setResume,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
