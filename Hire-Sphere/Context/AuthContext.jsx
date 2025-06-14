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

  useEffect(() => {

    if (localStorage.getItem("token")) {
      axios.defaults.headers.common["authorization"] = `Bearer ${token}`;
      checkAuth();
    } else {
      setAuthUser(null);
      setToken(null);
      navigate("/");
    }
  }, [token]);

  useEffect(() => {

    if (localStorage.getItem("token")) {
      axios.defaults.headers.common["authorization"] = `Bearer ${token}`;
      checkAuth();
    } else {
      setAuthUser(null);
      setToken(null);
      navigate("/");
    }
  }, []);

  

  const checkAuth = async () => {
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/check-auth`);
      if (data.success) {
        setAuthUser(data.user);
      } else {
        handleAuthFailure("Session expired...Please log in again");
      }
    } catch (error) {
      handleAuthFailure(error.message);
    }
  };

  const handleAuthFailure = (message) => {
    localStorage.removeItem("token");
    setAuthUser(null);
    setToken(null);
    toast.error(message);
    navigate("/");
  };

  const login = async (body, userType) => {
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/${userType}-login`,
        body
      );
      if (data.success) {
        setAuthUser(data.user);
        setToken(data.token);
        localStorage.setItem("token", data.token);
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
        `${import.meta.env.VITE_BACKEND_URL}/${userType}-signup`,
        body
      );
      if (data.success) {
        setAuthUser(data.user);
        setToken(data.token);
        localStorage.setItem("token", data.token);
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
    localStorage.removeItem("token");
    delete axios.defaults.headers.common["authorization"];
    setAuthUser(null);
    setToken(null);
    toast.success("Logout successfully");
    navigate("/");
  };

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
