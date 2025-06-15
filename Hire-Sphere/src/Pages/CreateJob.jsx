import React, { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import pic1 from "../assets/default1.png";
import { IoExit } from "react-icons/io5";
import { EmpContext } from "../../Context/EmpContext";
import toast from "react-hot-toast";

const CreateJob = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false); 
  const { logout, createJob } = useContext(EmpContext);


  // Form state for job posting
  const [formData, setFormData] = useState({
    jobId: "",
    jobTitle: "",
    jobDescription: "",
    companyName: "",
    location: "",
    employmentType: "Full-time",
    salaryRange: { min: "", max: "" },
    skillsRequired: "",
    applicationDeadline: "",
  });

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "salaryMin" || name === "salaryMax") {
      setFormData((prev) => ({
        ...prev,
        salaryRange: {
          ...prev.salaryRange,
          [name === "salaryMin" ? "min" : "max"]: value,
        },
      }));
    } else if (name === "skillsRequired") {
      setFormData((prev) => ({
        ...prev,
        skillsRequired: value,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true); 

    const slug = formData.jobId;

    const jobData = {
      jobTitle: formData.jobTitle,
      jobDescription: formData.jobDescription,
      companyName: formData.companyName,
      location: formData.location,
      employmentType: formData.employmentType,
      salaryRange: {
        min: parseInt(formData.salaryRange.min),
        max: parseInt(formData.salaryRange.max),
      },
      skillsRequired: formData.skillsRequired
        .split(",")
        .map((skill) => skill.trim())
        .filter((skill) => skill),
      applicationDeadline: new Date(formData.applicationDeadline).toISOString(),
      isOpen: true, 
    };

    try {
      await createJob(slug, jobData);  // making the req
      setFormData({
    jobId: "",
    jobTitle: "",
    jobDescription: "",
    companyName: "",
    location: "",
    employmentType: "Full-time",
    salaryRange: { min: "", max: "" },
    skillsRequired: "",
    applicationDeadline: "",
  })
    } catch (error) {
      toast.error("Error creating job:", error);
    } finally {
      setIsLoading(false); 
    }
  };

  return (
    <div className="bg-gradient-to-b from-black to-gray-900 min-h-screen w-full font-sans text-white">
      {/* Navbar */}
      <div
        className={`${
          isSidebarOpen ? "blur-sm" : ""
        } transition-all duration-300`}
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

      {/* Side Panel */}
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

      {/* Main Content - Job Creation Form */}
      <div
        className={`${
          isSidebarOpen ? "blur-sm" : ""
        } transition-all duration-300 px-8 py-10`}
      >
        <div className="max-w-3xl mx-auto">
          {/* Introductory Content */}
          <div className="mb-8 text-center">
            <h1 className="text-4xl font-bold text-[#39FF14] mb-4">
              Create a New Job Opening
            </h1>
            <p className="text-gray-300 text-lg leading-relaxed">
              Fill out the details below to post a new job opening on
              HireSphere. Attract top talent by providing clear and detailed
              information about the role, requirements, and benefits.
            </p>
          </div>

          {/* Job Creation Form */}
          <div className="bg-gradient-to-b from-gray-900 via-black to-gray-800 rounded-2xl shadow-2xl p-8 border border-gray-700">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Job ID */}
              <div>
                <label
                  htmlFor="jobId"
                  className="block text-[#39FF14] font-semibold mb-2"
                >
                  Job ID <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="jobId"
                  name="jobId"
                  value={formData.jobId}
                  onChange={handleInputChange}
                  className="w-full p-3 bg-gray-800 text-gray-200 rounded-lg border border-gray-700 focus:outline-none focus:border-[#39FF14] transition"
                  placeholder="e.g., JOB12345 (must be unique)"
                  required
                  disabled={isLoading}
                />
              </div>

              {/* Job Title */}
              <div>
                <label
                  htmlFor="jobTitle"
                  className="block text-[#39FF14] font-semibold mb-2"
                >
                  Job Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="jobTitle"
                  name="jobTitle"
                  value={formData.jobTitle}
                  onChange={handleInputChange}
                  className="w-full p-3 bg-gray-800 text-gray-200 rounded-lg border border-gray-700 focus:outline-none focus:border-[#39FF14] transition"
                  placeholder="e.g., Software Engineer"
                  required
                  disabled={isLoading}
                />
              </div>

              {/* Job Description */}
              <div>
                <label
                  htmlFor="jobDescription"
                  className="block text-[#39FF14] font-semibold mb-2"
                >
                  Job Description <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="jobDescription"
                  name="jobDescription"
                  value={formData.jobDescription}
                  onChange={handleInputChange}
                  className="w-full p-3 bg-gray-800 text-gray-200 rounded-lg border border-gray-700 focus:outline-none focus:border-[#39FF14] transition resize-y"
                  rows="5"
                  placeholder="Describe the role, responsibilities, and qualifications..."
                  required
                  disabled={isLoading}
                />
              </div>

              {/* Company Name */}
              <div>
                <label
                  htmlFor="companyName"
                  className="block text-[#39FF14] font-semibold mb-2"
                >
                  Company Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="companyName"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleInputChange}
                  className="w-full p-3 bg-gray-800 text-gray-200 rounded-lg border border-gray-700 focus:outline-none focus:border-[#39FF14] transition"
                  placeholder="e.g., TechCorp Inc."
                  required
                  disabled={isLoading}
                />
              </div>

              {/* Location */}
              <div>
                <label
                  htmlFor="location"
                  className="block text-[#39FF14] font-semibold mb-2"
                >
                  Location <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  className="w-full p-3 bg-gray-800 text-gray-200 rounded-lg border border-gray-700 focus:outline-none focus:border-[#39FF14] transition"
                  placeholder="e.g., Remote or New York, NY"
                  required
                  disabled={isLoading}
                />
              </div>

              {/* Employment Type */}
              <div>
                <label
                  htmlFor="employmentType"
                  className="block text-[#39FF14] font-semibold mb-2"
                >
                  Employment Type <span className="text-red-500">*</span>
                </label>
                <select
                  id="employmentType"
                  name="employmentType"
                  value={formData.employmentType}
                  onChange={handleInputChange}
                  className="w-full p-3 bg-gray-800 text-gray-200 rounded-lg border border-gray-700 focus:outline-none focus:border-[#39FF14] transition"
                  required
                  disabled={isLoading}
                >
                  <option value="Full-time">Full-time</option>
                  <option value="Part-time">Part-time</option>
                  <option value="Contract">Contract</option>
                  <option value="Temporary">Temporary</option>
                  <option value="Internship">Internship</option>
                </select>
              </div>

              {/* Salary Range */}
              <div>
                <label className="block text-[#39FF14] font-semibold mb-2">
                  Salary Range (Annual) <span className="text-red-500">*</span>
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input
                    type="number"
                    name="salaryMin"
                    value={formData.salaryRange.min}
                    onChange={handleInputChange}
                    className="w-full p-3 bg-gray-800 text-gray-200 rounded-lg border border-gray-700 focus:outline-none focus:border-[#39FF14] transition"
                    placeholder="Min (e.g., 50000)"
                    required
                    disabled={isLoading}
                  />
                  <input
                    type="number"
                    name="salaryMax"
                    value={formData.salaryRange.max}
                    onChange={handleInputChange}
                    className="w-full p-3 bg-gray-800 text-gray-200 rounded-lg border border-gray-700 focus:outline-none focus:border-[#39FF14] transition"
                    placeholder="Max (e.g., 80000)"
                    required
                    disabled={isLoading}
                  />
                </div>
              </div>

              {/* Skills Required */}
              <div>
                <label
                  htmlFor="skillsRequired"
                  className="block text-[#39FF14] font-semibold mb-2"
                >
                  Skills Required <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="skillsRequired"
                  name="skillsRequired"
                  value={formData.skillsRequired}
                  onChange={handleInputChange}
                  className="w-full p-3 bg-gray-800 text-gray-200 rounded-lg border border-gray-700 focus:outline-none focus:border-[#39FF14] transition"
                  placeholder="e.g., JavaScript, React, Node.js (comma-separated)"
                  required
                  disabled={isLoading}
                />
              </div>

              {/* Application Deadline */}
              <div>
                <label
                  htmlFor="applicationDeadline"
                  className="block text-[#39FF14] font-semibold mb-2"
                >
                  Application Deadline <span className="text-red-500">*</span>
                </label>
                <input
                  type="datetime-local"
                  id="applicationDeadline"
                  name="applicationDeadline"
                  value={formData.applicationDeadline}
                  onChange={handleInputChange}
                  className="w-full p-3 bg-gray-800 text-gray-200 rounded-lg border border-gray-700 focus:outline-none focus:border-[#39FF14] transition"
                  min={new Date().toISOString().slice(0, 16)} // Prevent past dates
                  required
                  disabled={isLoading}
                />
              </div>

              {/* Submit Button */}
              <div className="flex justify-center mt-8">
                <button
                  type="submit"
                  className={`bg-[#39FF14] text-black text-lg px-8 py-3 rounded-lg font-semibold hover:bg-[#35cc0f] transition-all duration-300 shadow-md ${
                    isLoading ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                  disabled={isLoading}
                >
                  {isLoading ? "Posting..." : "Post Job"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateJob;
