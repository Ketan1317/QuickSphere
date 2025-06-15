import React, { useContext, useEffect, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import toast, { useToaster } from "react-hot-toast";
import { EmpContext } from "../../Context/EmpContext";
import UserLayout from "../Components/UserLayout"; // Adjust path as needed
import pic1 from "../assets/default1.png";

const ResumePage = () => {
  const { profileSlugId } = useParams();
  const { profile, getProfileBySlug, shortlistProfile } = useContext(EmpContext);
  const [loading, setLoading] = useState(true);
  const [isShortlisting, setIsShortlisting] = useState(false);

  const navigate = useNavigate()

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      await getProfileBySlug(profileSlugId);
      setLoading(false);
    };
    fetchProfile();
  }, [profileSlugId]); // Added getProfileBySlug to dependencies

  const handleShortlist = async () => {
    if (!profile?._id) {
      toast.error("Profile not found");
      return;
    }
    setIsShortlisting(true);
    const success = await shortlistProfile(profile._id);
    if (success) {
      // Optionally update the local profile state or refetch the profile
      await getProfileBySlug(profileSlugId); // Refetch to update shortlistedBy count
    }
    setIsShortlisting(false);
  };

  return (
    <UserLayout>
      <div className="px-8 py-10">
        {loading ? (
          <p className="text-gray-400 text-center">Loading...</p>
        ) : profile ? (
          <div className="bg-gradient-to-b from-gray-900 via-black to-gray-800 rounded-2xl shadow-2xl p-8 space-y-8 max-w-4xl mx-auto border border-gray-700">
            {/* Profile Header */}
            <div className="flex items-center gap-4 border-b border-gray-700 pb-4">
              <img
                src={profile.profilePicUrl || pic1}
                alt={`${profile.username || "User"}'s profile`}
                className="w-16 h-16 rounded-full object-cover border-2 border-[#39FF14]"
              />
              <div>
                <h2 className="text-2xl font-semibold text-white">
                  {profile.username || "Unknown User"}
                </h2>
                <p className="text-gray-400">{profile.email || "N/A"}</p>
              </div>
            </div>

            {/* Resume Section */}
            <div className="space-y-4">
              <h1 className="text-4xl font-bold text-[#39FF14]">
                Professional Resume
              </h1>
              <p className="text-gray-300 text-lg">
                {profile.bio || "No bio available."}
              </p>
            </div>

            {/* Profile Details */}
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="flex items-center gap-3 p-4 bg-gray-800 rounded-lg shadow-sm">
                  <span className="text-[#39FF14] font-semibold">Email:</span>
                  <span className="text-gray-300">{profile.email || "N/A"}</span>
                </div>
                <div className="flex items-center gap-3 p-4 bg-gray-800 rounded-lg shadow-sm">
                  <span className="text-[#39FF14] font-semibold">Experience:</span>
                  <span className="text-gray-300">{profile.experience || "N/A"}</span>
                </div>
                <div className="flex items-start gap-3 p-4 bg-gray-800 rounded-lg shadow-sm col-span-2">
                  <span className="text-[#39FF14] font-semibold">Skills:</span>
                  <ul className="text-gray-300 space-y-1 flex flex-wrap gap-2">
                    {profile.skills?.length > 0 ? (
                      profile.skills.map((skill, index) => (
                        <li
                          key={index}
                          className="bg-gray-700 text-xs font-medium px-2 py-1 rounded-full"
                        >
                          {skill}
                        </li>
                      ))
                    ) : (
                      <li className="text-gray-400">No skills listed</li>
                    )}
                  </ul>
                </div>
                <div className="flex items-center gap-3 p-4 bg-gray-800 rounded-lg shadow-sm">
                  <span className="text-[#39FF14] font-semibold">Shortlisted By:</span>
                  <span className="text-gray-300">
                    {profile.shortlistedBy?.length || 0} employer(s)
                  </span>
                </div>
                <div className="flex items-start gap-3 p-4 bg-gray-800 rounded-lg shadow-sm">
                  <span className="text-[#39FF14] font-semibold">Social:</span>
                  <div className="flex gap-4">
                    {profile.githubUrl ? (
                      <a
                        href={profile.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-300 hover:text-[#39FF14] transition"
                      >
                        GitHub
                      </a>
                    ) : (
                      <span className="text-gray-400">No GitHub</span>
                    )}
                    {profile.linkedinUrl ? (
                      <a
                        href={profile.linkedinUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-300 hover:text-[#39FF14] transition"
                      >
                        LinkedIn
                      </a>
                    ) : (
                      <span className="text-gray-400">No LinkedIn</span>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 bg-gray-800 rounded-lg shadow-sm">
                  <span className="text-[#39FF14] font-semibold">Created:</span>
                  <span className="text-gray-300">
                    {profile.createdAt
                      ? new Date(profile.createdAt).toLocaleString("en-GB", {
                          dateStyle: "long",
                          timeStyle: "short",
                        })
                      : "N/A"}
                  </span>
                </div>
                <div className="flex items-center gap-3 p-4 bg-gray-800 rounded-lg shadow-sm">
                  <span className="text-[#39FF14] font-semibold">Updated:</span>
                  <span className="text-gray-300">
                    {profile.updatedAt
                      ? new Date(profile.updatedAt).toLocaleString("en-GB", {
                          dateStyle: "long",
                          timeStyle: "short",
                        })
                      : "N/A"}
                  </span>
                </div>
              </div>
            </div>

            {/* Shortlist Button */}
            <div className="flex gap-4 mt-8">
              <button
                onClick={handleShortlist}
                disabled={isShortlisting}
                className={`bg-[#39FF14] text-black text-lg px-6 py-3 rounded-lg font-semibold hover:bg-[#35cc0f] transition-all duration-300 shadow-md ${
                  isShortlisting ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {isShortlisting ? "Shortlisting..." : "ShortList this Developer"}
              </button>
              <button className="bg-gray-400 text-black text-lg px-6 py-3 rounded-lg font-semibold hover:bg-gray-500 transition-all duration-300 shadow-md" onClick={() => navigate(-1)}>
                Back To Main Page
              </button>
            </div>
          </div>
        ) : (
          <p className="text-gray-400 text-center">No profile found.</p>
        )}
      </div>
    </UserLayout>
  );
};

export default ResumePage;