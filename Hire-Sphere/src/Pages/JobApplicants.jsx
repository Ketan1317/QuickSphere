import React, { useContext, useState, useEffect } from "react";
import { useParams, NavLink } from "react-router-dom";
import toast from "react-hot-toast";
import { EmpContext } from "../../Context/EmpContext";
import UserLayout from "../Components/UserLayout"; // Adjust path as needed

const JobApplicants = () => {
  const { jobId } = useParams(); // Get jobId from URL
  const { getApplicants } = useContext(EmpContext);
  const [applicants, setApplicants] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchApplicants = async () => {
      setLoading(true);
      const fetchedApplicants = await getApplicants(jobId);
      setApplicants(fetchedApplicants);
      setLoading(false);
    };
    fetchApplicants();
  }, [jobId]);

  return (
    <UserLayout>
      <div className="px-6 lg:px-12 py-8">
        {/* Header Section */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-[#39FF14] mb-2">
              Applicants for Job ID: {jobId}
            </h1>
            <p className="text-gray-400 text-lg">
              View and manage applicants who applied for this job
            </p>
          </div>
          <NavLink
            to="/your-jobs"
            className="bg-gray-700 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-all duration-300"
          >
            Back to Jobs
          </NavLink>
        </div>

        {/* Applicants List */}
        <div className="bg-gray-800 rounded-xl p-6 shadow-lg">
          <h2 className="text-2xl font-semibold text-white mb-4">
            Applicants ({applicants.length})
          </h2>
          {loading ? (
            <p className="text-gray-400">Loading applicants...</p>
          ) : applicants && applicants.length > 0 ? (
            <div className="space-y-4">
              {applicants.map((applicant, index) => (
                <div
                  key={applicant._id}
                  className="bg-gray-900 rounded-lg p-4 flex items-center justify-between border border-gray-700 hover:bg-gray-850 transition-all duration-300"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-gray-600 rounded-full flex items-center justify-center text-white font-semibold">
                      {index + 1}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-[#39FF14]">
                        {applicant.username || "Unknown User"}
                      </h3>
                      <p className="text-gray-400">{applicant.email || "N/A"}</p>
                    </div>
                  </div>
                  <NavLink
                    to={`/applicant-profile/${applicant._id}`}
                    className="bg-[#39FF14] text-black text-sm px-4 py-2 rounded-lg font-semibold hover:bg-[#28CC0F] transition-all duration-300 shadow-md"
                  >
                    View Profile
                  </NavLink>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-400">No applicants for this job yet.</p>
          )}
        </div>
      </div>
    </UserLayout>
  );
};

export default JobApplicants;