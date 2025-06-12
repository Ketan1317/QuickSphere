const express = require("express");
const { verifyToken } = require("../Services/tokens");
const { User } = require("../Models/user");

const protectRoutes = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startWith("Bearer ")) {
            res.status(500).json({ success: false, message: "Not Authenticated" });
        }
        const token = authHeader.split(" ")[1];
        const payload = verifyToken(token);
        const user = await User.findOne({ email: payload.email }).select("-password");

        req.user = user;
        next();

    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }

}

module.exports = {protectRoutes}