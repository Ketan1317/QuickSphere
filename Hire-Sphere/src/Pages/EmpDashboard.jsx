import React, { useContext, useState, useEffect } from "react";
import { EmpContext } from "../../Context/EmpContext";
import { NavLink } from "react-router-dom";
import pic1 from "../assets/default1.png";
import { IoExit } from "react-icons/io5";
import ResumeCard from "../Components/ResumeCard";
import { toast } from "react-hot-toast";

const EmpDashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { logout, allProfilesData, getAllProfiles } = useContext(EmpContext);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    const fetchProfiles = async () => {
      setLoading(true);
      try {
        const response = await getAllProfiles();
        if (!response.success) {
          toast.error(response.message || "Failed to load profiles");
        }
      } catch (error) {
        console.error("Error fetching profiles:", error);
        toast.error("Failed to load profiles");
      } finally {
        setLoading(false);
      }
    };
    fetchProfiles();
  }, []);

  return (
    <div className="bg-gradient-to-b from-black to-gray-900 min-h-screen w-full font-sans">
      <div
        className={`${isSidebarOpen ? "blur-sm" : ""} transition-all duration-300`}
      >
        <div className="relative">
          <nav className="flex justify-between items-center px-6 py-4 bg-gradient-to-r from-gray-900 via-gray-950 to-black text-white shadow-lg">
            <div className="text-3xl font-semibold logo ml-6 text-[#39FF14]">
              HireSphere🌎
            </div>
            <div className="flex gap-6">
              <NavLink
                to="/empDashboard"
                className={({ isActive }) =>
                  `relative group px-4 font-semibold text-xl py-2 transition ${
                    isActive
                      ? "text-[#39FF14] font-bold glow"
                      : "hover:text-[#39FF14]"
                  }`
                }
              >
                <span className="relative">
                  Dashboard
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#39FF14] transition-all duration-300 group-hover:w-full"></span>
                </span>
              </NavLink>
              <NavLink
                to="/create-job"
                className={({ isActive }) =>
                  `relative group px-4 py-2 font-semibold text-xl transition ${
                    isActive
                      ? "text-[#39FF14] font-bold glow"
                      : "hover:text-[#39FF14]"
                  }`
                }
              >
                <span className="relative">
                  Create Opening
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#39FF14] transition-all duration-300 group-hover:w-full"></span>
                </span>
              </NavLink>
              <NavLink
                to="/your-jobs"
                className={({ isActive }) =>
                  `relative group px-4 py-2 font-semibold text-xl transition ${
                    isActive
                      ? "text-[#39FF14] font-bold glow"
                      : "hover:text-[#39FF14]"
                  }`
                }
              >
                <span className="relative">
                  Jobs
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#39FF14] transition-all duration-300 group-hover:w-full"></span>
                </span>
              </NavLink>
              <NavLink
                to="/emp-contact"
                className={({ isActive }) =>
                  `relative group px-4 py-2 font-semibold text-xl transition ${
                    isActive
                      ? "text-[#39FF14] font-bold glow"
                      : "hover:text-[#39FF14]"
                  }`
                }
              >
                <span className="relative">
                  Contact
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#39FF14] transition-all duration-300 group-hover:w-full"></span>
                </span>
              </NavLink>
              <div
                className="relative w-8 h-8 rounded-full mt-1 cursor-pointer"
                onClick={toggleSidebar}
              >
                <img
                  src={pic1}
                  className="w-full h-full rounded-full"
                  alt="Profile"
                />
              </div>
            </div>
          </nav>
        </div>
      </div>

      <div
        className={`fixed top-0 right-0 h-full w-80 bg-gradient-to-r from-gray-900 via-gray-950 to-black text-white shadow-lg transform transition-transform duration-300 z-20 ${
          isSidebarOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-700">
          <h2 className="text-3xl mt-3 font-bold text-[#39FF14]">
            More Options
          </h2>
          <button
            onClick={toggleSidebar}
            className="text-2xl mt-4 text-gray-300 hover:scale-105 hover:text-[#39FF14] transition"
          >
            <IoExit />
          </button>
        </div>
        <ul className="space-y-4 text-lg font-medium mt-6 px-4">
          <li>
            <NavLink
              to="/settings"
              className="block text-xl text-gray-300 hover:scale-105 hover:text-[#39FF14] transition"
            >
              Settings
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/notifications"
              className="block text-xl text-gray-300 hover:scale-105 hover:text-[#39FF14] transition"
            >
              Notifications
            </NavLink>
          </li>
          <li>
            <button
              className="block text-xl text-gray-300 cursor-pointer hover:scale-105 hover:text-red-600 transition"
              onClick={logout}
            >
              Logout
            </button>
          </li>
        </ul>
      </div>

      <div
        className={`${isSidebarOpen ? "blur-sm" : ""} transition-all duration-300`}
      >
        <div className="px-6 py-8 lg:px-12">
          <h1 className="text-4xl font-bold text-white mb-2">
            Welcome to Your Employer Dashboard
          </h1>
          <p className="text-lg font-semibold text-gray-300 mb-6">
            Manage your job postings, explore candidate profiles, and
            streamline your hiring process with HireSphere.
          </p>
          <div className="flex items-center justify-center gap-6">
            <div className="bg-gray-800 w-[18vw] rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow duration-300">
              <h3 className="text-xl font-semibold text-[#39FF14] mb-2">
                Active Job Postings
              </h3>
              <p className="text-3xl font-bold text-white">12</p>
              <p className="text-gray-400 font-semibold mt-1">
                Currently open roles
              </p>
            </div>
            <div className="bg-gray-800 rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow duration-300">
              <h3 className="text-xl font-semibold text-[#39FF14] mb-2">
                Applications Received
              </h3>
              <p className="text-3xl font-bold text-white">45</p>
              <p className="text-gray-400 font-semibold mt-1">
                Pending review
              </p>
            </div>
            <div className="bg-gray-800 w-[18vw] rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow duration-300">
              <h3 className="text-xl font-semibold text-[#39FF14] mb-2">
                Candidate Profiles
              </h3>
              <p className="text-3xl font-bold text-white">
                {allProfilesData ? allProfilesData.length : 0}
              </p>
              <p className="text-gray-400 font-semibold mt-1">
                Available for review
              </p>
            </div>
          </div>
        </div>

        {/* Candidate Profiles Section */}
        <div className="px-6 py-8 lg:px-12">
          <h2 className="text-4xl font-bold text-white mb-6">
            Explore Candidate Profiles
          </h2>
          {loading ? (
            <p className="text-lg text-gray-400 text-center mt-8">
              Loading profiles...
            </p>
          ) : (
            <>
              <div className="grid mt-9 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {allProfilesData && allProfilesData.length > 0 ? (
                  allProfilesData.map((profile) => (
                    <div
                      key={profile.profileSlugId}
                      className="transform mt-6 mr-4 transition-transform duration-300 hover:scale-105"
                    >
                      <ResumeCard profile={profile} />
                    </div>
                  ))
                ) : (
                  <p className="text-lg text-gray-400 text-center col-span-3 mt-8">
                    No candidate profiles available. Encourage job seekers to apply!
                  </p>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default EmpDashboard;