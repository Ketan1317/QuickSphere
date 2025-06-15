import React, { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import { IoExit } from "react-icons/io5";
import pic1 from "../assets/default1.png";
import { AuthContext } from "../../Context/AuthContext";

const UserContact = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { logout } = useContext(AuthContext);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="bg-gradient-to-br from-gray-900 via-black to-gray-800 min-h-screen w-full text-white font-sans">
      {/* Navbar (Untouched) */}
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

      <div className="relative">
        {/* Sidebar (Untouched) */}
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

        {/* Contact Page Content */}
        <div
          className={`${
            isSidebarOpen ? "blur-sm" : ""
          } transition-all px-6 lg:px-12 py-8`}
        >
          {/* Header Section */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-[#39FF14] mb-2">
              Contact Us
            </h1>
            <p className="text-gray-400 text-lg">
              We're here to help! Reach out with any questions or feedback.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Contact Form Section */}
            <div className="bg-gray-800 rounded-xl p-6 shadow-lg">
              <h2 className="text-2xl font-semibold text-white mb-4">
                Send Us a Message
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-gray-300 mb-1" htmlFor="name">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    placeholder="Your Name"
                    className="w-full px-4 py-3 bg-gray-900 text-white rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-[#39FF14] transition-all"
                  />
                </div>
                <div>
                  <label className="block text-gray-300 mb-1" htmlFor="email">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    placeholder="Your Email"
                    className="w-full px-4 py-3 bg-gray-900 text-white rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-[#39FF14] transition-all"
                  />
                </div>
                <div>
                  <label className="block text-gray-300 mb-1" htmlFor="message">
                    Message
                  </label>
                  <textarea
                    id="message"
                    placeholder="Your Message"
                    rows="4"
                    className="w-full px-4 py-3 bg-gray-900 text-white rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-[#39FF14] transition-all resize-none"
                  />
                </div>
                <button className="w-full bg-[#39FF14] text-black text-lg px-6 py-3 rounded-lg font-semibold hover:bg-[#28CC0F] transition-all duration-300 shadow-md">
                  Submit
                </button>
              </div>
            </div>

            {/* Contact Information Section */}
            <div className="space-y-6">
              <div className="bg-gray-800 rounded-xl p-6 shadow-lg">
                <h2 className="text-2xl font-semibold text-white mb-4">
                  Get in Touch
                </h2>
                <div className="space-y-4 text-gray-300">
                  <div className="flex items-center gap-3">
                    <svg
                      className="h-6 w-6 text-[#39FF14]"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                    <p>support@hiresphere.com</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <svg
                      className="h-6 w-6 text-[#39FF14]"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                    <p>+91 987-654-3210</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <svg
                      className="h-6 w-6 text-[#39FF14]"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M17.657 16.243l-4.243-4.243m0 0L9.172 7.757M12 12l4.243-4.243M12 12l-4.243 4.243M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <p>HireSphere Headquarters, Mumbai, India</p>
                  </div>
                </div>
              </div>

              {/* Map Placeholder */}
              <div className="bg-gray-800 rounded-xl p-6 shadow-lg">
                <h2 className="text-2xl font-semibold text-white mb-4">
                  Our Location
                </h2>
                <div className="h-48 bg-gray-700 rounded-lg flex items-center justify-center">
                  <p className="text-gray-400">
                    [Map Placeholder - HireSphere HQ, Mumbai]
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserContact;
