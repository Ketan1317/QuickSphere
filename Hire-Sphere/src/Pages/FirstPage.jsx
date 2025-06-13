import React from "react";
import { useNavigate } from "react-router-dom";

const FirstPage = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-gradient-to-b from-black to-gray-900 h-screen fixed w-full flex flex-col items-center justify-center text-white">
      <h1 className="font-semibold text-5xl mb-28 text-center sm:mb-36">
        Welcome to{" "}
        <span className="logo font-bold text-6xl text-[#39FF14]">
          HireSphere🌏
        </span>
      </h1>
      <div className="flex flex-col sm:flex-row gap-10 sm:gap-16 items-center justify-center px-4">
        {/* Employer Section */}
        <div className="bg-gray-900 p-8 sm:p-10 rounded-2xl shadow-xl text-center hover:scale-105 transition transform duration-300 w-[80%] sm:w-[35%]">
          <h2 className="text-3xl font-bold text-[#39FF14] mb-6">
            Want to Join as an Employer?
          </h2>
          <p className="text-gray-300 mb-6 font-semibold leading-relaxed">
            Looking to hire talented individuals for your company? Sign up to 
            connect with a diverse pool of skilled professionals ready to make 
            an impact.
          </p>
          <button
            onClick={() => navigate("/empSignup")}
            className="bg-[#39FF14] text-black px-6 py-3 rounded-lg font-semibold hover:bg-green-600 transition"
          >
            Join as Employer
          </button>
        </div>

        {/* Jobseeker Section */}
        <div className="bg-gray-900 p-8 sm:p-10 rounded-2xl shadow-xl text-center hover:scale-105 transition transform duration-300 w-[80%] sm:w-[35%]">
          <h2 className="text-3xl font-bold text-[#39FF14] mb-6">
            Want to Join as a Jobseeker?
          </h2>
          <p className="text-gray-300 mb-6 font-semibold leading-relaxed">
            Ready to take the next step in your career? Create an account to 
            discover exciting job opportunities and connect with top employers.
          </p>
          <button
            onClick={() => navigate("/userSignup")}
            className="bg-[#39FF14] text-black px-6 py-3 rounded-lg font-semibold hover:bg-green-600 transition"
          >
            Join as Jobseeker
          </button>
        </div>
      </div>
    </div>
  );
};

export default FirstPage;
