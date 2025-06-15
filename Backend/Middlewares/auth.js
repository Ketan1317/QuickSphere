const express = require("express");
const { verifyToken } = require("../Services/tokens");
const { User } = require("../Models/user");

const protectRoutes = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    console.log(1);

    if (!authHeader || !authHeader.startsWith("Bearer ")) { 
      return res.status(401).json({ success: false, message: "Not Authenticated" }); 
    }
    console.log(2);

    const token = authHeader.split(" ")[1];
    if (!token) {
      return res.status(401).json({ success: false, message: "Token missing" });
    }

    const payload = verifyToken(token);
    if (!payload || !payload.email) {
      return res.status(401).json({ success: false, message: "Invalid token payload" });
    }

    const user = await User.findOne({ email: payload.email }).select("-password");
    if (!user) {
      return res.status(401).json({ success: false, message: "User not found" });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error("Protect routes error:", error.message); // Added logging for debugging
    return res.status(401).json({ success: false, message: "Authentication failed: " + error.message }); // Changed status to 401
  }
};

module.exports = { protectRoutes };