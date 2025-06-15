import React, { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import axios from "axios";

// Create a separate axios instance for job seeker requests
const jobSeekerAxios = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
});

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();

  const [authUser, setAuthUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token1") || null);
  const [userProfile, setUserProfile] = useState(null);
  const [resume, setResume] = useState(null);

  const [favJobs,setFavJobs] = useState(null);
  const [appliedJobs,setAppliedJobs] = useState(null);


  const [jobsData, setJobsData] = useState(null);

  const [jobSlug, setJobSlug] = useState(null);

  const checkAuth = async () => {
    if (!token) {
      console.log("No token1 found for checkAuth");
      return;
    }
    try {
      const res = await jobSeekerAxios.get("/api/check-auth", {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      console.log("checkAuth response:", res.data);
      if (res.data.success) {
        setAuthUser(res.data.user);
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

  const userLogin = async (body) => {
    try {
      const { data } = await jobSeekerAxios.post("/api/jobSeeker-login", body);
      console.log("userLogin response:", data);
      if (data.success) {
        setAuthUser(data.user);
        setToken(data.token);
        localStorage.setItem("token1", data.token);
        toast.success(data.message || "Login successful");
        navigate("/userdashboard");
      } else {
        toast.error(data.message || "Login failed");
      }
    } catch (error) {
      console.error("userLogin error:", error.response?.data || error.message);
      toast.error(
        error.response?.data?.message || "Error occurred during login"
      );
    }
  };

  const userSignup = async (body) => {
    try {
      const { data } = await jobSeekerAxios.post("/api/jobSeeker-signup", body);
      console.log("userSignup response:", data);
      if (data.success) {
        setAuthUser(data.user);
        setToken(data.token);
        localStorage.setItem("token1", data.token);
        toast.success(data.message || "Account created successfully");
        navigate("/userdashboard");
      } else {
        toast.error(data.message || "Signup failed");
      }
    } catch (error) {
      console.error("userSignup error:", error.response?.data || error.message);
      toast.error(
        error.response?.data?.message || "Error occurred during signup"
      );
    }
  };

  const logout = () => {
    localStorage.removeItem("token1");
    setAuthUser(null);
    setToken(null);
    setUserProfile(null);
    toast.success("Logged out successfully");
    navigate("/");
  };

  const handleAuthFailure = (message = "Not authenticated") => {
    console.log("handleAuthFailure triggered:", message);
    localStorage.removeItem("token1");
    setAuthUser(null);
    setToken(null);
    setUserProfile(null);
    toast.error(message);
    navigate("/");
  };

  const handleProfileChange = async (body) => {
    if (!token) {
      handleAuthFailure("Please log in to update your profile");
      return;
    }
    try {
      const { data } = await jobSeekerAxios.post("/api/update-profile", body, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      console.log("handleProfileChange response:", data);
      if (data.success) {
        setUserProfile(data.profileData);
        toast.success(data.message || "Profile updated successfully");
      } else {
        toast.error(data.message || "Failed to update profile");
      }
    } catch (error) {
      console.error(
        "handleProfileChange error:",
        error.response?.data || error.message
      );
      toast.error(error.response?.data?.message || "Error updating profile");
    }
  };

  const getProfile = async () => {
    if (!token) {
      toast.error("Please log in to view your profile");
      return;
    }
    try {
      const { data } = await jobSeekerAxios.get("/api/get-profile", {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      if (data.success) {
        setUserProfile(data.UserSpecificProfile);
      } else {
        toast.error(data.message || "Profile not found");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to fetch profile");
    }
  };

  const getAllJobs = async () => {
    if (!token) {
      handleAuthFailure("Please Log in First");
      return;
    }
    try {
      const { data } = await jobSeekerAxios.get("/api/getall-jobs", {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      if (data.success) {
        setJobsData(data.allJobs);
        // console.log(data.allJobs)
      } else {
        toast.error(data.message || "Jobs not found");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to fetch jobs");
    }
  };

  const getJobBySlug = async (slug) => {
    if (!token) {
      handleAuthFailure("Please Log in First");
      return;
    }
    try {
      const { data } = await jobSeekerAxios.get(
        `/api/get-job-by-slug/${slug}`,
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      if (data.success) {
        setJobSlug(data.jobBySlug);
      } else {
        toast.error(data.message || "Job not found");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to fetch job");
    }
  };

  const applyForJob = async (slug) => {
    if (!token) {
      handleAuthFailure("Please Log in First");
      return;
    }

    try {
      const { data } = await jobSeekerAxios.post(
        `/api/applying-for-job/${slug}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`, 
          },
        }
      );

      if (data.success) {
        toast.success(data.message || "Job application successful! 🎉");
      } else {
        toast.error(
          data.message || "Unable to apply for this job. Please try again."
        );
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const markFav = async (slug) => {
    if (!token) {
      handleAuthFailure("Please Log in First");
      return;
    }
    try {
      const { data } = await jobSeekerAxios.post(
        `/api/mark-favourite/${slug}`,{},
        {
          headers: {
            Authorization: `Bearer ${token}`, 
          },
        }
      );
      if (data.success) {
        toast.success(data.message);
      } else {
        toast.error(data.message || "Cannot add to favourites");
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to add this job to favourites"
      );
    }
  };
  const unmarkFav = async (slug) => {
    if (!token) {
      handleAuthFailure("Please Log in First");
      return;
    }
    try {
      const { data } = await jobSeekerAxios.post(
        `/api/unmark-favourite/${slug}`,{},
        {
          headers: {
            Authorization: `Bearer ${token}`, 
          },
        }
      );
      if (data.success) {
        toast.success(data.message);
      } else {
        toast.error(data.message || "Cannot remove from favourites");
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to remove this job from favourites"
      );
    }
  };

  const getFav = async () => {
    if (!token) {
      handleAuthFailure("Please Log in First")
      return;
    }
    try {
      const { data } = await jobSeekerAxios.get(`/api/get-Fav-jobs`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      if (data.success) {
        setFavJobs(data.favJobs)
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message);
    }

  }
  const getAppliedJobs = async () => {
    if (!token) {
      handleAuthFailure("Please Log in First")
      return;
    }
    try {
      const { data } = await jobSeekerAxios.get(`/api/get-jobs-applied-for`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      if (data.success) {
        setAppliedJobs(data.appliedJobs)
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message);
    }

  }

  useEffect(() => {
    const token1 = localStorage.getItem("token1");
    console.log("Initial token1 check:", token1);
    if (token1) {
      setToken(token1);
    }
  }, []);

  useEffect(() => {
    if (token) {
      console.log("Token updated, calling checkAuth:", token);
      checkAuth();
    }
  }, [token]);

  const value = {
    userSignup,
    userLogin,
    logout,
    authUser,
    setAuthUser,
    token,
    setToken,
    userProfile,
    setUserProfile,
    resume,
    setResume,
    handleProfileChange,
    getProfile,
    getAllJobs,
    jobsData,
    getJobBySlug,
    jobSlug,
    applyForJob,
    markFav,
    unmarkFav,
    getFav,favJobs,
    getAppliedJobs
  
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
