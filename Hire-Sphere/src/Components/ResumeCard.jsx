import React from "react";
import pic1 from "../assets/default1.png";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const ResumeCard = ({ profile }) => {
  const {
    username, 
    email,
    bio,
    skills,
    experience,
    githubUrl,
    linkedinUrl,
    profilePicUrl, 
    profileSlugId,
  } = profile;

  const navigate = useNavigate();

  const handleResumeClick = () => {
    if (profileSlugId) {
      navigate(`/resumePage/${profile.profileSlugId}`)
    } else {
      console.error("Profile slug ID is missing:", profile);
    }
  };

  return (
    <div
      onClick={handleResumeClick}
      className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl shadow-lg p-6 max-w-sm mx-auto border border-gray-700 transition-transform duration-300 hover:scale-105 hover:shadow-xl cursor-pointer h-96 flex flex-col justify-between"
    >
      {/* Profile Image */}
      <div className="relative flex justify-center mb-4">
        <img
          src={profilePicUrl || pic1}
          alt={`${username || "User"}'s profile`}
          className="w-20 h-20 rounded-full object-cover border-2 border-[#39FF14] shadow-md transition-transform duration-300 group-hover:scale-110"
        />
      </div>

      {/* Username and Email */}
      <h3 className="text-xl font-semibold text-[#39FF14] text-center">
        {username || "Unknown User"}
      </h3>
      <p className="text-sm text-gray-400 text-center mt-1">{email || "N/A"}</p>

      {/* Bio */}
      <p className="text-sm text-gray-300 mt-4 text-center line-clamp-3">
        {bio || "No bio available."}
      </p>

      {/* Skills */}
      <div className="mt-4">
        <h4 className="text-sm font-semibold text-[#39FF14] mb-2">Skills</h4>
        <div className="flex flex-wrap gap-2">
          {skills && Array.isArray(skills) && skills.length > 0 ? (
            skills.map((skill, index) => (
              <span
                key={index}
                className="bg-gray-700 text-gray-200 text-xs font-medium px-2 py-1 rounded-full"
              >
                {skill}
              </span>
            ))
          ) : (
            <span className="text-gray-400 text-xs">No skills listed</span>
          )}
        </div>
      </div>

      {/* Experience */}
      <div className="mt-4">
        <h4 className="text-sm font-semibold text-[#39FF14] mb-1">Experience</h4>
        <p className="text-sm text-gray-300">{experience || "N/A"}</p>
      </div>

      {/* Social Links */}
      <div className="flex justify-center gap-4 mt-6">
        {githubUrl ? (
          <a
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-[#39FF14] transition-colors duration-300"
            title="GitHub Profile"
          >
            <FaGithub className="w-5 h-5" />
          </a>
        ) : (
          <span className="text-gray-400">
            <FaGithub className="w-5 h-5 opacity-50" />
          </span>
        )}
        {linkedinUrl ? (
          <a
            href={linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-[#39FF14] transition-colors duration-300"
            title="LinkedIn Profile"
          >
            <FaLinkedin className="w-5 h-5" />
          </a>
        ) : (
          <span className="text-gray-400">
            <FaLinkedin className="w-5 h-5 opacity-50" />
          </span>
        )}
      </div>
    </div>
  );
};

export default ResumeCard;