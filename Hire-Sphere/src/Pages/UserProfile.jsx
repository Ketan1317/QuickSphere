import React, { useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import { IoExit } from "react-icons/io5";
import pic1 from "../assets/default1.png";

const UserProfile = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Function to toggle the sidebar
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
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
          <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 flex items-center justify-center py-10">
            <div className="bg-gradient-to-r from-gray-900 via-gray-950 to-black rounded-2xl shadow-2xl p-8 max-w-[50vw] w-full border border-gray-700">
              <h2 className="text-3xl text-center font-bold text-[#39FF14] mb-6">
                Create Your Profile
              </h2>
              <form className="space-y-6">
                {/* Username */}
                <div>
                  <label className="block text-xl font-medium text-gray-300">
                    Username
                  </label>
                  <input
                    type="text"
                    name="username"
                    placeholder="Enter your name here"
                    // value={formData.username}
                    // onChange={handleChange}
                    required
                    className="w-full mt-1 p-3 bg-gray-800 border border-gray-600 rounded-lg focus:ring-2 focus:ring-[#39FF14] focus:border-[#39FF14] outline-none transition text-white"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-xl font-medium text-gray-300">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    placeholder="example69@gmail.com"
                    // value={formData.email}
                    // onChange={handleChange}
                    required
                    className="w-full mt-1 p-3 bg-gray-800 border border-gray-600 rounded-lg focus:ring-2 focus:ring-[#39FF14] focus:border-[#39FF14] outline-none transition text-white"
                  />
                </div>

                {/* Bio */}
                <div>
                  <label className="block text-xl font-medium text-gray-300">
                    Bio
                  </label>
                  <textarea
                    name="bio"
                    // value={formData.bio}
                    // onChange={handleChange}
                    placeholder="Enter something interesting about you"
                    required
                    maxLength={150}
                    className="w-full mt-1 p-3 bg-gray-800 border border-gray-600 rounded-lg focus:ring-2 focus:ring-[#39FF14] focus:border-[#39FF14] outline-none transition text-white resize-none h-32"
                  />
                </div>

                {/* Skills */}
                <div>
                  <label className="block text-xl font-medium text-gray-300">
                    Skills (comma-separated)
                  </label>
                  <input
                    type="text"
                    name="skills"
                    placeholder="java, c++, React"
                    // value={formData.skills}
                    // onChange={handleChange}
                    required
                    className="w-full mt-1 p-3 bg-gray-800 border border-gray-600 rounded-lg focus:ring-2 focus:ring-[#39FF14] focus:border-[#39FF14] outline-none transition text-white"
                  />
                </div>

                {/* Experience */}
                <div>
                  <label className="block text-xl font-medium text-gray-300">
                    Experience
                  </label>
                  <select
                    name="experience"
                    // value={formData.experience}
                    // onChange={handleChange}
                    required
                    className="w-full mt-1 p-3 bg-gray-800 border border-gray-600 rounded-lg focus:ring-2 focus:ring-[#39FF14] focus:border-[#39FF14] outline-none transition text-white"
                  >
                    <option value="">Select Experience</option>
                    <option value="Fresher">Fresher</option>
                    <option value="1-3 years">1-3 years</option>
                    <option value="3-5 years">3-5 years</option>
                    <option value="5-10 years">5-10 years</option>
                    <option value="10+ years">10+ years</option>
                  </select>
                </div>

                {/* GitHub URL */}
                <div>
                  <label className="block text-xl font-medium text-gray-300">
                    GitHub URL
                  </label>
                  <input
                    type="url"
                    name="githubUrl"
                    placeholder="https://github.com/"
                    // value={formData.githubUrl}
                    // onChange={handleChange}
                    className="w-full mt-1 p-3 bg-gray-800 border border-gray-600 rounded-lg focus:ring-2 focus:ring-[#39FF14] focus:border-[#39FF14] outline-none transition text-white"
                  />
                </div>

                {/* LinkedIn URL */}
                <div>
                  <label className="block text-xl font-medium text-gray-300">
                    LinkedIn URL
                  </label>
                  <input
                    type="url"
                    name="linkedinUrl"
                    placeholder="https://linkedin.com/"
                    // value={formData.linkedinUrl}
                    // onChange={handleChange}
                    className="w-full mt-1 p-3 bg-gray-800 border border-gray-600 rounded-lg focus:ring-2 focus:ring-[#39FF14] focus:border-[#39FF14] outline-none transition text-white"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-[30vw] ml-28 mt-4 text-2xl font-semibold py-3 px-4 bg-[#39FF14] text-black cursor-pointer rounded-lg shadow-md hover:bg-[#28CC0F] transition duration-300"
                >
                  Create Profile
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
