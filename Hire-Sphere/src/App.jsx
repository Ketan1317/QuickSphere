import React, { useContext } from "react";
import { Toaster } from "react-hot-toast";
import { Routes, Route, Navigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";
import { EmpContext } from "../Context/EmpContext";

import UserDashboard from "./Pages/UserDashboard";
import JobPage from "./Pages/JobPage";
import UserLogin from "./Pages/UserLogin";
import UserSignup from "./Pages/UserSignup";
import EmpDashboard from "./Pages/EmpDashboard";
import UserProfile from "./Pages/UserProfile";
import FirstPage from "./Pages/FirstPage";
import EmpSignup from "./Pages/EmpSignup";
import EmpLogin from "./Pages/EmpLogin";
import ResumePage from "./Pages/ResumePage";
import CreateJob from "./Pages/CreateJob";
import EmpJobs from "./Pages/EmpJobs";
import EmpContact from "./Pages/EmpContact"
import UserAcceptance from "./Pages/UserAcceptance";
import JobApplicants from "./Pages/JobApplicants";
import ApplicantProfile from "./Pages/ApplicantProfile";

const App = () => {
  const { authUser } = useContext(AuthContext);
  const { authEmp } = useContext(EmpContext);

  return (
    <div>
      <Toaster />
      <Routes>
        {/* Root path: Redirect based on authentication status */}
        <Route
          path="/"
          element={
            authUser ? (
              <Navigate to="/userdashboard" />
            ) : authEmp ? (
              <Navigate to="/empdashboard" />
            ) : (
              <FirstPage />
            )
          }
        />

        {/* Job Seeker Routes */}
        <Route
          path="/userdashboard"
          element={authUser ? <UserDashboard /> : <Navigate to="/userlogin" />}
        />
        <Route
          path="/jobpage/:jobId"
          element={
            authUser && !authEmp ? <JobPage /> : <Navigate to="/userlogin" />
          }
        />
        <Route
          path="/userlogin"
          element={!authUser ? <UserLogin /> : <Navigate to="/userdashboard" />}
        />
        <Route
          path="/usersignup"
          element={
            !authUser ? <UserSignup /> : <Navigate to="/userdashboard" />
          }
        />
        <Route
          path="/profile"
          element={authUser ? <UserProfile /> : <Navigate to="/userlogin" />}
        />
        <Route
          path="/user-noti"
          element={authUser ? <UserAcceptance /> : <Navigate to="/userlogin" />}
        />
        <Route path="/job-applicants/:jobId" element={<JobApplicants />} />

        {/* Employer Routes */}
        <Route
          path="/empdashboard"
          element={authEmp ? <EmpDashboard /> : <Navigate to="/emplogin" />}
        />
        <Route
          path="/create-job"
          element={authEmp ? <CreateJob /> : <Navigate to="/emplogin" />}
        />
        <Route path="/applicant-profile/:profileId" element={<ApplicantProfile />} />
        <Route
          path="/your-jobs"
          element={authEmp ? <EmpJobs /> : <Navigate to="/emplogin" />}
        />
        <Route
          path="/emplogin"
          element={!authEmp ? <EmpLogin /> : <Navigate to="/empdashboard" />}
        />
        <Route
          path="/empsignup"
          element={!authEmp ? <EmpSignup /> : <Navigate to="/empdashboard" />}
        />

        <Route
          path="/resumePage/:profileSlugId"
          element={authEmp ? <ResumePage /> : <Navigate to="/emplogin" />}
        />

        <Route
          path="/emp-contact"
          element={authEmp ? <EmpContact/> : <Navigate to="/emplogin" />}
        />

        {/* Catch-all route for 404 */}
        <Route path="/*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
};

export default App;
