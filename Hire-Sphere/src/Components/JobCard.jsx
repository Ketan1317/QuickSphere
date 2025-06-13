import React from "react";
import { useNavigate } from "react-router-dom";
import { IoBookmarksOutline } from "react-icons/io5";
import { CiLocationOn } from "react-icons/ci";
import { MdOutlineWorkHistory } from "react-icons/md";


const JobCard = ({ job }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/jobPage/${job.jobId}`);
  };

  return (
    <div
      className="relative bg-gradient-to-r from-gray-800 via-gray-900 to-black w-[30vw] shadow-2xl transition-all rounded-3xl cursor-pointer p-6 group border border-gray-700"
      onClick={handleCardClick}
    >
      <div className="absolute inset-0 transition rounded-3xl"></div>

      <div className="relative z-10">
        <h2 className="text-2xl font-extrabold text-[#39FF14] mb-2 group-hover:scale-[108%] transition-transform">
          {job.jobTitle}
        </h2>

        <p className="font-medium text-gray-400 mb-4">{job.companyName}</p>

        <div className="flex flex-col gap-2 text-sm">
          <p className="flex items-center gap-1 text-gray-300">
            <CiLocationOn className="mr-1 text-lg" /> {job.location}
          </p>
          <p className="flex items-center gap-1 text-gray-300">
            <MdOutlineWorkHistory className="mr-1 text-lg" />{" "}
            {job.employmentType}
          </p>
        </div>

        <p className="text-[#39FF14] mt-4 font-bold text-lg">
          ₹{job.salaryRange.min} - ₹{job.salaryRange.max} / month
        </p>
      </div>

      <div className="absolute top-4 right-4 flex items-center gap-2">
          <IoBookmarksOutline className="w-5 h-5 text-[#39FF14] transition-transform" />
      </div>
    </div>
  );
};

export default JobCard;
