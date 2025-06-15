import React, { useContext, useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { EmpContext } from "../../Context/EmpContext";
import UserLayout from "../Components/UserLayout"; // Adjust path as needed
import pic1 from "../assets/default1.png";

const ApplicantProfile = () => {
  const { profileId } = useParams(); // Get profileId from URL
  const { getApplicantProfile } = useContext(EmpContext);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState({ accept: false, reject: false });

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      const fetchedProfile = await getApplicantProfile(profileId);
      setProfile(fetchedProfile);
      setLoading(false);
    };
    fetchProfile();
  }, [profileId]);

  

  return (
    <UserLayout>
      <div className="px-8 py-10">
        {loading ? (
          <p className="text-gray-400 text-center">Loading profile...</p>
        ) : profile ? (
          <div className="bg-gradient-to-b from-gray-900 via-black to-gray-800 rounded-2xl shadow-2xl p-8 space-y-8 max-w-4xl mx-auto border border-gray-700">
            {/* Header Section */}
            <div className="flex items-center justify-between border-b border-gray-700 pb-4">
              <div className="flex items-center gap-4">
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
              <NavLink
                to="/your-jobs"
                className="bg-gray-700 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-all duration-300"
              >
                Back to Jobs
              </NavLink>
            </div>

            {/* Profile Details */}
            <div className="space-y-4">
              <h1 className="text-4xl font-bold text-[#39FF14]">
                Applicant Profile
              </h1>
              <p className="text-gray-300 text-lg">
                {profile.bio || "No bio available."}
              </p>
            </div>

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
                <div className="flex items-start gap-3 p-4 bg-gray-800 rounded-lg shadow-sm col-span-2">
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
              </div>
            </div>

            {/* Accept and Reject Buttons */}
            <div className="flex gap-4 mt-8">
              <button
                // onClick={handleAccept}
                // disabled={actionLoading.accept}
                className={`bg-[#39FF14] text-black text-lg px-6 py-3 rounded-lg font-semibold hover:bg-[#28CC0F] transition-all duration-300 shadow-md ${
                  actionLoading.accept ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {actionLoading.accept ? "Processing..." : "Accept"}
              </button>
              <button
                // onClick={handleReject}
                // disabled={actionLoading.reject}
                className={`bg-red-600 text-white text-lg px-6 py-3 rounded-lg font-semibold hover:bg-red-700 transition-all duration-300 shadow-md ${
                  actionLoading.reject ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {actionLoading.reject ? "Processing..." : "Reject"}
              </button>
            </div>
          </div>
        ) : (
          <p className="text-gray-400 text-center">Profile not found.</p>
        )}
      </div>
    </UserLayout>
  );
};

export default ApplicantProfile;