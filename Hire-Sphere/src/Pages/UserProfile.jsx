import React, { useContext, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { IoExit } from "react-icons/io5";
import pic1 from "../assets/default1.png";
import { AuthContext } from "../../Context/AuthContext";
import { toast } from "react-hot-toast";

const UserProfile = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [skills, setSkills] = useState("");
  const [bio, setBio] = useState("");
  const [experience, setExperience] = useState("");
  const [githubUrl, setGithubUrl] = useState("");
  const [linkedinUrl, setLinkedinUrl] = useState("");
  const [profileSlugId, setProfileSlugId] = useState("");

  const { handleProfileChange, getProfile, token, userProfile, logout } = useContext(AuthContext);

  // Generate slug from username
  const generateSlug = (username) => {
    return username
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");
  };

  // ye vala har baar mount hone pe token agar hai to profile ko get krega
  useEffect(() => {
    if (token) {
      setIsLoading(true);
      getProfile();
      setIsLoading(false);
    } else {
      toast.error("Please log in to view your profile");
    }
  }, []);

  // ye vala jab jab getProfile() call hoga check krega ki agar koi data aya to use render krega
  useEffect(() => {
    if (userProfile) {
      setName(userProfile.username || "");
      setEmail(userProfile.email || "");
      setBio(userProfile.bio || "");
      setSkills(userProfile.skills?.join(", ") || "");
      setExperience(userProfile.experience || "");
      setGithubUrl(userProfile.githubUrl || "");
      setLinkedinUrl(userProfile.linkedinUrl || "");
      setProfileSlugId(
        userProfile.profileSlugId || generateSlug(userProfile.username || "")
      );
    }
  }, [userProfile]);

  // Update profileSlugId when username changes
  useEffect(() => {
    if (name && !userProfile?.profileSlugId) {
      setProfileSlugId(generateSlug(name));
    }
  }, [name, userProfile]);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const skillsArray = skills
      .split(",")
      .map((skill) => skill.trim())
      .filter(Boolean);
    if (!profileSlugId.match(/^[a-z0-9-]+$/)) {
      toast.error("Invalid profile slug ID format");
      return;
    }
    const body = {
      username: name,
      email,
      bio,
      skills: skillsArray,
      experience,
      linkedinUrl,
      githubUrl,
      profileSlugId,
    };
    handleProfileChange(body);
  };

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
              onClick={logout}
              className="block text-xl cursor-pointer hover:scale-105 text-gray-300 hover:text-red-600 transition"
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
                {userProfile ? "Update Your Profile" : "Create Your Profile"}
              </h2>
              {isLoading ? (
                <div className="text-center text-[#39FF14]">
                  Loading profile...
                </div>
              ) : !userProfile ? (
                <div className="text-center text-gray-300">
                  No profile found. Please create your profile below.
                </div>
              ) : null}
              <form onSubmit={handleFormSubmit} className="space-y-6">
                {/* Username */}
                <div>
                  <label className="block text-xl font-medium text-gray-300">
                    Username
                  </label>
                  <input
                    type="text"
                    name="username"
                    placeholder="Enter your name here"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="w-full mt-1 p-3 bg-gray-800 border border-gray-600 rounded-lg focus:ring-2 focus:ring-[#39FF14] focus:border-[#39FF14] outline-none transition text-white"
                  />
                </div>

                {/* Profile Slug ID (Read-only) */}
                <div>
                  <label className="block text-xl font-medium text-gray-300">
                    Profile Slug ID
                  </label>
                  <input
                    type="text"
                    name="profileSlugId"
                    value={profileSlugId}
                    readOnly
                    className="w-full mt-1 p-3 bg-gray-800 border border-gray-600 rounded-lg text-gray-400 cursor-not-allowed"
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
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
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
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
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
                    value={skills}
                    onChange={(e) => setSkills(e.target.value)}
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
                    value={experience}
                    onChange={(e) => setExperience(e.target.value)}
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
                    type="text"
                    name="githubUrl"
                    placeholder="https://github.com/"
                    value={githubUrl}
                    onChange={(e) => setGithubUrl(e.target.value)}
                    className="w-full mt-1 p-3 bg-gray-800 border border-gray-600 rounded-lg focus:ring-2 focus:ring-[#39FF14] focus:border-[#39FF14] outline-none transition text-white"
                  />
                </div>

                {/* LinkedIn URL */}
                <div>
                  <label className="block text-xl font-medium text-gray-300">
                    LinkedIn URL
                  </label>
                  <input
                    type="text"
                    name="linkedinUrl"
                    placeholder="https://linkedin.com/"
                    value={linkedinUrl}
                    onChange={(e) => setLinkedinUrl(e.target.value)}
                    className="w-full mt-1 p-3 bg-gray-800 border border-gray-600 rounded-lg focus:ring-2 focus:ring-[#39FF14] focus:border-[#39FF14] outline-none transition text-white"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className={`w-[30vw] ml-28 mt-4 text-2xl font-semibold py-3 px-4 bg-[#39FF14] text-black cursor-pointer rounded-lg shadow-md hover:bg-[#28CC0F] transition duration-300 ${
                    isLoading ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                >
                  {userProfile ? "Update Profile" : "Create Profile"}
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
