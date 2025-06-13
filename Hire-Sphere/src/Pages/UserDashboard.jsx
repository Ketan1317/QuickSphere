import React, { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import { IoExit } from "react-icons/io5";
import pic1 from "../assets/default1.png";
import JobCard from "../Components/JobCard";
import { AuthContext } from "../../Context/AuthContext";

const Navbar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const {token,authUser} = useContext(AuthContext)


  const dummyData = [
    {
      jobId: "JOB12345",
      jobTitle: "Software Developer",
      jobDescription:
        "We are looking for a passionate Software Developer to join our team and build innovative solutions.",
      companyName: "TechCorp Inc.",
      location: "Bengaluru, India",
      employmentType: "Full-time",
      salaryRange: {
        min: 50000,
        max: 70000,
      },
      skillsRequired: ["JavaScript", "React", "Node.js", "MongoDB"],
      isOpen: true,
      postedBy: "60f7c8e1f456f340e8b5b915",
      postedAt: "2025-06-10T09:00:00Z",
      applicationDeadline: "2025-06-30T23:59:59Z",
      applicants: ["60f7c8e1f456f340e8b5b913", "60f7c8e1f456f340e8b5b914"],
      selectedApplicants: ["60f7c8e1f456f340e8b5b914"],
    },
    {
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
      postedBy: "60f7c8e1f456f340e8b5b916",
      postedAt: "2025-06-12T11:00:00Z",
      applicationDeadline: "2025-07-10T23:59:59Z",
      applicants: ["60f7c8e1f456f340e8bb5b917", "60f7c8e1f456f340e8b5b918"],
      selectedApplicants: ["60f7c8e1f456f340e8b5b918"],
    },
    {
      jobId: "JOB12347",
      jobTitle: "UI/UX Designer",
      jobDescription:
        "Join our creative team to design intuitive user interfaces and improve user experience.",
      companyName: "Designify Co.",
      location: "Pune, India",
      employmentType: "Freelance",
      salaryRange: {
        min: 30000,
        max: 50000,
      },
      skillsRequired: ["Figma", "Adobe XD", "Prototyping"],
      isOpen: true,
      postedBy: "60f7c8e1f456f340e8b5b919",
      postedAt: "2025-06-15T10:00:00Z",
      applicationDeadline: "2025-07-05T23:59:59Z",
      applicants: ["60f7c8e1f456f340e8b5b920", "60f7c8e1f456f340e8b5b921"],
      selectedApplicants: ["60f7c8e1f456f340e8b5b921"],
    },
  ];

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="bg-gradient-to-b from-black to-gray-900 h-screen w-full">
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

        <div className={`${isSidebarOpen ? "blur-sm" : ""} transition-all`}>
          <h1 className="text-2xl font-bold mb-4 mx-4 lg:mx-8">
            Available Jobs
          </h1>

          <div className="relative">
            {/* Background Panel */}
            <div className="absolute inset-0 bg-gradient-to-r from-gray-800 to-black rounded-2xl mx-4 lg:mx-8 -z-10"></div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mx-4 lg:mx-8">
              {dummyData.map((job) => (
                <JobCard key={job.jobId} job={job} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
