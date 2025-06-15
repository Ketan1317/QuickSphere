import React from "react";
import { NavLink } from "react-router-dom";
import { IoExit } from "react-icons/io5";
import pic1 from "../assets/default1.png";

const EmpHeader = ({ isSidebarOpen, toggleSidebar }) => {
  return (
    <div className={`${isSidebarOpen ? "blur-sm" : ""} transition-all`}>
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
  );
};

export default EmpHeader;