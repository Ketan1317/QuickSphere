import React, { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import axios from "axios";

// Create a separate axios instance for employer requests
const employerAxios = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
});

export const EmpContext = createContext();

export const EmpProvider = ({ children }) => {
  const navigate = useNavigate();

  const [authEmp, setAuthEmp] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("empToken") || null);
  const [allProfilesData, setAllProfilesData] = useState([]);

  const [empJobs, setEmpJobs] = useState(null);

  const [applicants, setApplicants] = useState(null);

  const [profile, setProfile] = useState(null);

  const checkAuth = async () => {
    if (!token) {
      console.log("No empToken found for checkAuth");
      return;
    }
    try {
      const res = await employerAxios.get("/api/check-auth", {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      console.log("checkAuth response:", res.data);
      if (res.data.success) {
        setAuthEmp(res.data.user);
      } else {
        handleAuthFailure(res.data.message || "Authentication failed");
      }
    } catch (error) {
      console.error("checkAuth error:", error.response?.data || error.message);
      handleAuthFailure(
        error.response?.data?.message || "Authentication failed"
      );
    }
  };

  const empLogin = async (body) => {
    try {
      const { data } = await employerAxios.post("/emp/employer-login", body);
      console.log("empLogin response:", data);
      if (data.success) {
        setAuthEmp(data.user);
        setToken(data.token);
        localStorage.setItem("empToken", data.token);
        toast.success(data.message || "Login successful");
        navigate("/empdashboard");
      } else {
        toast.error(data.message || "Login failed");
      }
    } catch (error) {
      console.error("empLogin error:", error.response?.data || error.message);
      toast.error(
        error.response?.data?.message || "Error occurred during login"
      );
    }
  };

  const empSignup = async (body) => {
    try {
      const { data } = await employerAxios.post("/emp/employer-signup", body);
      console.log("empSignup response:", data);
      if (data.success) {
        setAuthEmp(data.user);
        setToken(data.token);
        localStorage.setItem("empToken", data.token);
        toast.success(data.message || "Account created successfully");
        navigate("/empdashboard");
      } else {
        toast.error(data.message || "Signup failed");
      }
    } catch (error) {
      console.error("empSignup error:", error.response?.data || error.message);
      toast.error(
        error.response?.data?.message || "Error occurred during signup"
      );
    }
  };

  const logout = () => {
    localStorage.removeItem("empToken");
    setAuthEmp(null);
    setToken(null);
    toast.success("Logged out successfully");
    navigate("/");
  };

  const getAllProfiles = async () => {
    if (!token) {
      handleAuthFailure("Please log in First");
      return;
    }
    try {
      const response = await employerAxios.get("/emp/get-all-profiles", {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      const { data } = response;
      if (data.success) {
        setAllProfilesData(data.allProfilesData || []);
        return { success: true, data };
      } else {
        toast.error(data.message || "Failed to fetch profiles");
        return { success: false, message: data.message };
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Error occurred while fetching profiles"
      );
    }
  };

  const handleAuthFailure = (message = "Not authenticated") => {
    console.log("handleAuthFailure triggered:", message);
    localStorage.removeItem("empToken");
    setAuthEmp(null);
    setToken(null);
    toast.error(message);
    navigate("/");
  };

  const createJob = async (slug, body) => {
    if (!token) {
      handleAuthFailure("Please log in to create a Job opening");
      return;
    }
    try {
      const response = await employerAxios.post(
        `/emp/create-job/${slug}`,
        body,
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      const { data } = response;
      if (data.success) {
        toast.success(data.message);
      } else {
        toast.error(data.message || "Failed to Create a Job");
      }
    } catch (error) {
      console.error(error.message);
      toast.error(error.response?.data?.message);
    }
  };

  const getProfileBySlug = async (slug) => {
    if (!token) {
      handleAuthFailure("Please log in First");
      return;
    }
    try {
      const response = await employerAxios.get(`/emp/profile-by-slug/${slug}`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      const { data } = response;
      if (data.success) {
        setProfile(data.profileBySlug);
      } else {
        toast.error(data.message || "Failed to fetch profile");
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Error occurred while fetching profile"
      );
    }
  };

  const getEmpSpecJob = async () => {
    if (!token) {
      handleAuthFailure("Please log in First");
      return;
    }
    try {
      const response = await employerAxios.get(`/emp/get-emp-specific-jobs`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      const { data } = response;
      if (data.success) {
        setEmpJobs(data.userSpecificJobs);
      } else {
        toast.error(data.message || "Failed to fetch Jobs");
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Error occurred while fetching Jobs"
      );
    }
  };

  const getApplicants = async (jobId) => {
    if (!token) {
      handleAuthFailure("Please log in First");
      return [];
    }
    try {
      const response = await employerAxios.get(`/emp/get-applicants/${jobId}`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      const { data } = response;
      if (data.success) {
        setApplicants(data.applicants);
        return data.applicants;
      } else {
        toast.error(data.message || "Failed to fetch applicants");
        return [];
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Error occurred while fetching applicants"
      );
      return [];
    }
  };

  const shortlistProfile = async (profileId) => {
    if (!token) {
      handleAuthFailure("Please log in First");
      return false;
    }
    try {
      const response = await employerAxios.post(
        `/emp/shortlisting-profile`,
        { profileId }, // Pass profileId in the request body
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      const { data } = response;
      if (data.success) {
        toast.success(data.message || "Profile shortlisted successfully!");
        return true; // Indicate success
      } else {
        toast.error(data.message || "Failed to shortlist the profile");
        return false;
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Error occurred while shortlisting the profile"
      );
      return false;
    }
  };

  const getApplicantProfile = async (profileId) => {
    if (!token) {
      handleAuthFailure("Please log in First");
    }
    try {
      const response = await employerAxios.get(
        `/emp/applicant-profile/${profileId}`,
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      const { data } = response;
      if (data.success) {
        return data.profile;
      } else {
        toast.error(data.message || "Failed to fetch applicant profile");
        return null;
      }
    } catch (error) {
      toast.error(error.message);
      return null;
    }
  };

  useEffect(() => {
    const empToken = localStorage.getItem("empToken");
    console.log("Initial empToken check:", empToken);
    if (empToken) {
      setToken(empToken);
    }
  }, []);

  useEffect(() => {
    if (token) {
      console.log("Token updated, calling checkAuth:", token);
      checkAuth();
    }
  }, [token]);

  const value = {
    authEmp,
    setAuthEmp,
    empLogin,
    handleAuthFailure,
    empSignup,
    logout,
    token,
    setToken,
    allProfilesData,
    employerAxios,
    setAllProfilesData,
    getAllProfiles,
    createJob,
    getProfileBySlug,
    profile,
    getEmpSpecJob,
    empJobs,
    applicants,
    getApplicants,
    getApplicantProfile,
    shortlistProfile,
  };

  return <EmpContext.Provider value={value}>{children}</EmpContext.Provider>;
};
