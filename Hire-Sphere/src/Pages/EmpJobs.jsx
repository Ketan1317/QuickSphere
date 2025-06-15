import React, { useContext, useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { EmpContext } from "../../Context/EmpContext";
import UserLayout from "../Components/UserLayout"; // Adjust path as needed

const EmpJobs = () => {
  const { empJobs, getEmpSpecJob } = useContext(EmpContext);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchJobs = async () => {
      setIsLoading(true);
      await getEmpSpecJob();
      setIsLoading(false);
    };
    fetchJobs();
  }, []); // Fixed dependency

  return (
    <UserLayout>
      <div className="px-8 py-10">
        <h1 className="text-2xl font-bold mb-4 text-white">Your Posted Jobs</h1>
        {isLoading ? (
          <p className="text-gray-400">Loading jobs...</p>
        ) : empJobs && empJobs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {empJobs.map((job) => (
              <div
                key={job.jobId}
                className="relative bg-gradient-to-r from-gray-800 via-gray-900 to-black shadow-2xl transition-all rounded-3xl p-6 border border-gray-700"
              >
                <div className="relative z-10">
                  <h2 className="text-2xl font-extrabold text-[#39FF14] mb-2">
                    {job.jobTitle || "Untitled Job"}
                  </h2>
                  <p className="font-medium text-gray-400 mb-4">
                    {job.companyName || "Unknown Company"}
                  </p>
                  <div className="flex flex-col gap-2 text-sm">
                    <p className="text-gray-300">
                      <span className="font-semibold">Location:</span>{" "}
                      {job.location || "N/A"}
                    </p>
                    <p className="text-gray-300">
                      <span className="font-semibold">Type:</span>{" "}
                      {job.employmentType || "N/A"}
                    </p>
                    <p className="text-gray-300">
                      <span className="font-semibold">Salary:</span>{" "}
                      {job.salaryRange
                        ? `₹${job.salaryRange.min} - ₹${job.salaryRange.max} / month`
                        : "N/A"}
                    </p>
                    <p className="text-gray-300">
                      <span className="font-semibold">Posted On:</span>{" "}
                      {job.postedAt
                        ? new Date(job.postedAt).toLocaleString("en-GB", {
                            dateStyle: "long",
                            timeStyle: "short",
                          })
                        : "N/A"}
                    </p>
                  </div>
                  <NavLink
                    to={`/job-applicants/${job.jobId}`}
                    className="inline-block mt-4 bg-[#39FF14] text-black text-sm px-4 py-2 rounded-lg font-semibold hover:bg-[#28CC0F] transition-all duration-300 shadow-md"
                  >
                    View Applicants
                  </NavLink>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-400">No jobs posted yet.</p>
        )}
      </div>
    </UserLayout>
  );
};

export default EmpJobs;