import React, { useContext } from "react";
import { Toaster } from "react-hot-toast";

import {Routes,Route, Navigate} from "react-router-dom";
import FirstPage from "./Pages/FirstPage";
import { AuthContext } from "../Context/AuthContext";
import UserLogin from "./Pages/UserLogin";
import UserSignup from "./Pages/UserSignup";
import UserDashboard from "./Pages/UserDashboard";
import EmpDashboard from "./Pages/EmpDashboard";
import EmpLogin from "./Pages/EmpLogin";
import EmpSignup from "./Pages/EmpSignup";
import UserProfile from "./Pages/UserProfile";

const App = () => {
  const {authUser} = useContext(AuthContext)
  return (
    <div>
      <Toaster/>
      <Routes>
        <Route path="/" element={<FirstPage/>} />

        <Route path="/userDashboard" element={authUser ? <UserDashboard/> : <Navigate to="/userLogin"/>}/>
        <Route path="/userLogin" element={!authUser ? <UserLogin/> : <Navigate to="/userDashboard"/>}/>
        <Route path="/userSignup" element={!authUser ? <UserSignup/> : <Navigate to="/userDashboard"/> }/>
        <Route path = "/userProfile" element={authUser ? <UserProfile/> : <Navigate to="/userLogin"/>}/>


        <Route path="/empDashboard" element={authUser ? <EmpDashboard/> : <Navigate to="/empLogin"/>}/>
        <Route path="/empLogin" element={!authUser ? <EmpLogin/> : <Navigate to="/empDashboard"/>}/>
        <Route path="/empSignup" element={!authUser ? <EmpSignup/> : <Navigate to="/empDashboard"/> }/>

        

      </Routes>

    </div>
  );
};

export default App;
