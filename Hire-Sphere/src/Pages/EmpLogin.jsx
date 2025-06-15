import React, { useContext, useState } from "react";
import { FiLogIn } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { TbLockPassword } from "react-icons/tb";
import { HiOutlineMailOpen } from "react-icons/hi";
import { EmpContext } from "../../Context/EmpContext";

const EmpLogin = () => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const navigate = useNavigate();

  const { empLogin } = useContext(EmpContext);

  const formSubmitHandler = (e) => {
    e.preventDefault();
    const body = { email, password: pass };

    empLogin(body);
    
    setEmail("");
    setPass("");
  };

  return (
    <div className="bg-gradient-to-b from-black to-gray-900 h-screen overflow-scroll w-full flex flex-col items-center">
      <nav className="w-full flex justify-between items-center px-16 py-6">
        <h1 className="font-bold logo text-4xl text-[#39FF14]">HireSphere🌏</h1>
      </nav>

      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-[#39FF14]">
          Login for Employers
        </h2>
        <p className="text-gray-400 font-semibold mt-2">
          Access your account and connect with top talent to build your team.
        </p>
      </div>

      <form onSubmit={formSubmitHandler} className="bg-gray-900 bg-opacity-90 p-8 rounded-2xl shadow-lg text-white w-[90%] sm:w-[30vw]">
        <p className="text-center text-xl font-semibold mb-4 flex items-center justify-center gap-2">
          <span className="text-[#39FF14] font-bold">Login</span>
          <FiLogIn className="text-[#39FF14] text-2xl animate-bounce" />
        </p>

        <div className="mb-4">
          <label
            htmlFor="email"
            className="flex items-center gap-2 text-sm font-semibold text-gray-300 mb-1"
          >
            <p>Email</p>
            <HiOutlineMailOpen />
          </label>
          <input
            type="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            placeholder="Enter your email"
            className="w-full px-3 py-2 text-black rounded-lg placeholder-gray-400 outline-none border-2 focus:border-[#39FF14] border-gray-600"
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="pass"
            className="flex items-center gap-2 text-sm font-semibold text-gray-300 mb-1"
          >
            <p>Password</p>
            <TbLockPassword />
          </label>
          <input
            type="password"
            id="pass"
            onChange={(e) => setPass(e.target.value)}
            value={pass}
            placeholder="Enter your password"
            className="w-full px-3 py-2 text-black rounded-lg placeholder-gray-400 outline-none border-2 focus:border-[#39FF14] border-gray-600"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-[#39FF14] text-black py-2 rounded-lg font-semibold hover:bg-green-600 transition"
        >
          Login
        </button>
        <p className="text-center text-gray-400 mt-4">
          Don’t have an account?{" "}
          <span
            onClick={() => navigate("/EmpSignup")}
            className="text-[#39FF14] font-semibold cursor-pointer hover:underline"
          >
            Create Account
          </span>
        </p>
      </form>
    </div>
  );
};

export default EmpLogin;
