import React, { useState, useEffect } from "react";
import { NavLink, useParams } from "react-router-dom";
import { IoExit } from "react-icons/io5";
import pic1 from "../assets/default1.png";

const JobPage = () => {
  const { jobId } = useParams();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Function to toggle the sidebar
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const job = {
    jobId: "JOB12346",
    jobTitle: "Data Scientist",
    jobDescription:
      "Looking for a skilled Data Scientist to analyze large datasets and provide actionable insights.",
    companyName: "DataMinds",
    location: "Mumbai, India",
    employmentType: "Part-time",
    salaryRange: {
      min: 60000,
      max: 80000,
    },
    skillsRequired: ["Python", "Machine Learning", "Data Analysis"],
    isOpen: true,
    postedBy: { username: "Ketan Goyal", email: "ketan1317@gmail.com" },
    postedAt: "2025-06-12T11:00:00Z",
    applicationDeadline: "2025-07-10T23:59:59Z",
    applicants: ["60f7c8e1f456f340e8bb5b917", "60f7c8e1f456f340e8b5b918"],
    selectedApplicants: ["60f7c8e1f456f340e8b5b918"],
  };

  return (
    <div className="bg-gradient-to-b from-black to-gray-900 min-h-screen w-full text-white">
      <div className={`${isSidebarOpen ? "blur-sm" : ""} transition-all`}>
        <div className="relative">
          <nav className="flex justify-between items-center px-6 py-4 bg-gradient-to-r from-gray-900 via-gray-950 to-black text-white shadow-lg">
            <div className="text-3xl font-semibold logo ml-6 text-[#39FF14]">
              HireSphere🌎
            </div>
            <div className="flex gap-6">
              <NavLink
                to="/"
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
            className="text-2xl mt-4 text-gray-300 hover:text-[#39FF14] transition"
          >
            <IoExit />
          </button>
        </div>
        <ul className="space-y-4 text-lg font-medium mt-6 px-4">
          <li>
            <NavLink
              to="/settings"
              className="block text-xl text-gray-300 hover:text-[#39FF14] transition"
            >
              Settings
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/notifications"
              className="block text-xl text-gray-300 hover:text-[#39FF14] transition"
            >
              Notifications
            </NavLink>
          </li>
          <li>
            <button
              className="block text-xl text-gray-300 hover:text-red-600 transition"
              onClick={toggleSidebar}
            >
              Logout
            </button>
          </li>
        </ul>
      </div>
      <div className={`${isSidebarOpen ? "blur-sm" : ""} transition-all`}>
        <div className="relative">
          {/* Job Details Section */}
          <div className="px-8 py-10">
            {job ? (
              <div className="bg-gradient-to-b from-gray-900 via-black to-gray-800 rounded-2xl shadow-2xl p-8 space-y-8 max-w-4xl mx-auto border border-gray-700">
                {/* Company Branding Section */}
                <div className="flex items-center gap-4 border-b border-gray-700 pb-4">
                  <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center">
                    <span className="text-2xl font-bold text-[#39FF14]">
                      {job.companyName.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <h2 className="text-2xl font-semibold text-white">
                      {job.companyName}
                    </h2>
                    <p className="text-gray-400">Innovating the Future</p>
                  </div>
                </div>

                {/* Job Title and Description */}
                <div className="space-y-4">
                  <h1 className="text-4xl font-bold text-[#39FF14]">
                    {job.jobTitle}
                  </h1>
                  <p className="text-gray-300 text-lg leading-relaxed">
                    {job.jobDescription}
                  </p>
                </div>

                {/* Job Details Section */}
                <div className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Location */}
                    <div className="flex items-center gap-3 p-4 bg-gray-800 rounded-lg shadow-sm">
                      <span className="text-[#39FF14] font-semibold">
                        Location:
                      </span>
                      <span className="text-gray-300">{job.location}</span>
                    </div>

                    {/* Employment Type */}
                    <div className="flex items-center gap-3 p-4 bg-gray-800 rounded-lg shadow-sm">
                      <span className="text-[#39FF14] font-semibold">
                        Type:
                      </span>
                      <span className="text-gray-300">
                        {job.employmentType}
                      </span>
                    </div>

                    {/* Salary */}
                    <div className="flex items-center gap-3 p-4 bg-gray-800 rounded-lg shadow-sm">
                      <span className="text-[#39FF14] font-semibold">
                        Salary:
                      </span>
                      <span className="text-gray-300">
                        ₹{job.salaryRange.min} - ₹{job.salaryRange.max} / month
                      </span>
                    </div>

                    {/* Application Deadline */}
                    <div className="flex items-center gap-3 p-4 bg-gray-800 rounded-lg shadow-sm">
                      <span className="text-[#39FF14] font-semibold">
                        Deadline:
                      </span>
                      <span className="text-gray-300">
                        {new Date(job.applicationDeadline).toLocaleString(
                          "en-GB",
                          {
                            dateStyle: "long",
                            timeStyle: "short",
                          }
                        )}
                      </span>
                    </div>

                    {/* Skills Required */}
                    <div className="flex items-start gap-3 p-4 bg-gray-800 rounded-lg shadow-sm col-span-2">
                      <span className="text-[#39FF14] font-semibold">
                        Skills:
                      </span>
                      <ul className="text-gray-300 space-y-1">
                        {job.skillsRequired.map((skill, index) => (
                          <li key={index} className="flex items-center gap-2">
                            <span className="w-2 h-2 bg-[#39FF14] rounded-full"></span>
                            {skill}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Posted By */}
                    <div className="flex items-start gap-3 p-4 bg-gray-800 rounded-lg shadow-sm col-span-2">
                      <span className="text-[#39FF14] font-semibold">
                        Posted By:
                      </span>
                      <div className="text-gray-300">
                        <p className="font-medium text-lg">
                          {job.postedBy.username}
                        </p>
                        <p className="text-sm text-gray-400">
                          {job.postedBy.email}
                        </p>
                      </div>
                    </div>

                    {/* Posted At */}
                    <div className="flex items-center gap-3 p-4 bg-gray-800 rounded-lg shadow-sm">
                      <span className="text-[#39FF14] font-semibold">
                        Posted On:
                      </span>
                      <span className="text-gray-300">
                        {new Date(job.postedAt).toLocaleString("en-GB", {
                          dateStyle: "long",
                          timeStyle: "short",
                        })}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4 mt-8">
                  <button className="bg-[#39FF14] text-black text-lg px-6 py-3 rounded-lg font-semibold hover:bg-[#28CC0F] transition-all duration-300 shadow-md">
                    Apply Now
                  </button>
                  <button className="bg-red-500 text-white text-lg px-6 py-3 rounded-lg font-semibold hover:bg-red-600 transition-all duration-300 shadow-md">
                    Decline
                  </button>
                </div>
              </div>
            ) : (
              <p className="text-gray-400">Loading job details...</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobPage;
