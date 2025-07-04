import React, { useContext, useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { IoExit } from "react-icons/io5";
import pic1 from "../assets/default1.png";
import JobCard from "../Components/JobCard";
import { AuthContext } from "../../Context/AuthContext";

const UserDashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { logout, getAllJobs, jobsData } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);

  
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState("All");

  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true);
      await getAllJobs();
      setLoading(false);
    };
    fetchJobs();
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const filteredJobs = jobsData?.filter((job) => {
    const matchesSearch = job.jobTitle
      ?.toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesType =
      filterType === "All" || job.employmentType === filterType;
    return matchesSearch && matchesType;
  });

  return (
    <div className="bg-gradient-to-br from-gray-900 via-black to-gray-800 min-h-screen w-full text-white font-sans">
      <div className={`${isSidebarOpen ? "blur-sm" : ""} transition-all`}>
        <div className="relative">
          <nav className="flex justify-between items-center px-6 py-4 bg-gradient-to-r from-gray-900 via-gray-950 to-black text-white shadow-lg">
            <div className="text-3xl font-semibold logo ml-6 text-[#39FF14]">
              HireSphere🌎
            </div>
            <div className="flex gap-6">
              <NavLink
                to="/userDashboard"
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
                to="/profile"
                className={({ isActive }) =>
                  `relative group px-4 py-2 font-semibold text-xl transition ${
                    isActive
                      ? "text-[#39FF14] font-bold glow"
                      : "hover:text-[#39FF14]"
                  }`
                }
              >
                <span className="relative">
                  Profile
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#39FF14] transition-all duration-300 group-hover:w-full"></span>
                </span>
              </NavLink>
              <NavLink
                to="/user-noti"
                className={({ isActive }) =>
                  `relative group px-4 py-2 font-semibold text-xl transition ${
                    isActive
                      ? "text-[#39FF14] font-bold glow"
                      : "hover:text-[#39FF14]"
                  }`
                }
              >
                <span className="relative">
                  Notifications
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#39FF14] transition-all duration-300 group-hover:w-full"></span>
                </span>
              </NavLink>
              <NavLink
                to="/userAbout"
                className={({ isActive }) =>
                  `relative group px-4 py-2 font-semibold text-xl transition ${
                    isActive
                      ? "text-[#39FF14] font-bold glow"
                      : "hover:text-[#39FF14]"
                  }`
                }
              >
                <span className="relative">
                  About
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

      <div className="relative">
        <div
          className={`fixed top-0 right-0 h-full w-64 bg-gray-900 text-white shadow-lg transform transition-transform duration-300 z-20 ${
            isSidebarOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
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
          <ul className="space-y-4 text-lg font-medium mt-6 px-4">
            <li>
              <NavLink
                to="/settings"
                className="block text-gray-300 hover:text-[#39FF14] transition"
              >
                Settings
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/notifications"
                className="block text-gray-300 hover:text-[#39FF14] transition"
              >
                Notifications
              </NavLink>
            </li>
            <li>
              <button
                className="block text-gray-300 hover:text-red-600 transition"
                onClick={toggleSidebar}
              >
                Logout
              </button>
            </li>
          </ul>
        </div>

        {/* Main Content Section */}
        <div className={`${isSidebarOpen ? "blur-sm" : ""} transition-all px-6 lg:px-12 py-8`}>
          {/* Header Section */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-[#39FF14] mb-2">
              Find Your Dream Job
            </h1>
            <p className="text-gray-400 text-lg">
              Explore opportunities tailored for you on HireSphere
            </p>
          </div>

          {/* Search and Filter Section */}
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Search jobs by title..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-3 bg-gray-800 text-white rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-[#39FF14] transition-all"
              />
              <svg
                className="absolute right-3 top-3 h-6 w-6 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <div className="relative">
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="px-4 py-3 bg-gray-800 text-white rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-[#39FF14] transition-all appearance-none w-full md:w-48"
              >
                <option value="All">All Types</option>
                <option value="Full-Time">Full-Time</option>
                <option value="Part-Time">Part-Time</option>
                <option value="Contract">Contract</option>
                <option value="Internship">Internship</option>
              </select>
              <svg
                className="absolute right-3 top-4 h-5 w-5 text-gray-400 pointer-events-none"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          </div>

          {/* Job Listings Section */}
          <div className="mb-6">
            <h2 className="text-2xl font-semibold text-white mb-4">
              Available Jobs
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {loading ? (
                <p className="text-gray-400 col-span-full">
                  Loading jobs...
                </p>
              ) : filteredJobs && filteredJobs.length > 0 ? (
                filteredJobs.map((job) => (
                  <JobCard key={job.jobId} job={job} />
                ))
              ) : (
                <p className="text-gray-400 col-span-full">
                  No jobs match your criteria.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;