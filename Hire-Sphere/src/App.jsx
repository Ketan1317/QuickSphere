import React, { useContext } from "react";
import { Toaster } from "react-hot-toast";
import { Routes, Route, Navigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";
import UserDashboard from "./Pages/UserDashboard";
import JobPage from "./Pages/JobPage";
import UserLogin from "./Pages/UserLogin";
import UserSignup from "./Pages/UserSignup";
import EmpDashboard from "./Pages/EmpDashboard";
import UserProfile from "./Pages/UserProfile";
import FirstPage from "./Pages/FirstPage";

const App = () => {
  const { authUser } = useContext(AuthContext);

  return (
    <div>
      <Toaster />
      <Routes>
        <Route path="/" element ={<FirstPage/>}/>
        <Route path="/UserDashboard" element={<UserDashboard />} />
        <Route path="/jobPage/:jobId" element={<JobPage />} />
        <Route path="/userLogin" element={!authUser ? <UserLogin /> : <Navigate to="/UserDashboard" />}/>
        <Route path="/userSignup" element={!authUser ? <UserSignup /> : <Navigate to="/UserDashboard" />} />
        <Route path="/profile" element={!authUser ? <UserProfile /> : <Navigate to="/UserDashboard" />} />
        <Route path="/empDashboard" element={<EmpDashboard />} />
      </Routes>
    </div>
  );
};
export default App;
