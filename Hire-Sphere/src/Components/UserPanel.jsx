import React, { useContext } from "react";
import { AuthContext } from "../../Context/AuthContext";
import { IoExit } from "react-icons/io5";
import { NavLink } from "react-router-dom";

const UserPanel = ({ isSidebarOpen, toggleSidebar }) => {
  const { logout } = useContext(AuthContext);

  return (
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
      </div>
    </div>
  );
};

export default UserPanel;