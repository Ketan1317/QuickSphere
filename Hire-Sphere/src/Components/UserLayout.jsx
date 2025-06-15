import React, { useState } from "react";
import EmpHeader from "./EmpHeader";
import UserPanel from "./UserPanel";

const UserLayout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="bg-gradient-to-br from-gray-900 via-black to-gray-800 min-h-screen w-full text-white font-sans">
      <EmpHeader
        isSidebarOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
      />
      <UserPanel
        isSidebarOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
      />
      <div className={`${isSidebarOpen ? "blur-sm" : ""} transition-all`}>
        {children}
      </div>
    </div>
  );
};

export default UserLayout;