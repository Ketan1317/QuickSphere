const express = require("express");
const bcrypt = require("bcrypt");
const { createToken } = require("../Services/tokens");
const { Employer } = require("../Models/employer");

const employerSignupHandler = async (req, res) => {
    try {
        const { username, email, password, companyName, websiteUrl } = req.body;
        console.log(req.body);

        if (!username || !email || !password || !companyName || !websiteUrl) {
            return res.status(400).json({ success: false, message: "Insufficient Credentials" });
        }

        const user = await Employer.findOne({ email });
        if (user) {
            return res.status(400).json({ success: false, message: "Email already in use" });
        }

        const hashedPass = await bcrypt.hash(password, 10);

        const userDetails = await Employer.create({
            username,
            email,
            password: hashedPass,
            companyName,
            websiteUrl,
        });

        const token = createToken(userDetails);

        res.status(201).json({
            success: true,
            message: "Account created successfully",
            token,
            user: {
                id: userDetails._id,
                username: userDetails.username,
                email: userDetails.email,
                companyName: userDetails.companyName,
                websiteUrl: userDetails.websiteUrl,
            },
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ success: false, message: error.message });
    }
};

const employerLoginHandler = async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log("we are in login");

        if (!email || !password) {
            return res.status(400).json({ success: false, message: "Insufficient Credentials" });
        }

        const user = await Employer.findOne({ email });
        if (!user) {
            return res.status(404).json({ success: false, message: "No user available with this email" });
        }

        const isCorrectPass = await bcrypt.compare(password, user.password);
        if (!isCorrectPass) {
            return res.status(401).json({ success: false, message: "Incorrect Password" });
        }

        const token = createToken(user);

        res.status(200).json({
            success: true,
            message: "Login successful",
            token,
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                companyName: user.companyName,
                websiteUrl: user.websiteUrl,
            },
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ success: false, message: error.message });
    }
};

const deleteEmpAccout = async (req, res) => {
    try {
        const user = req.user;
        console.log(user);
        if (!user || !user._id) {
            return res.status(401).json({ success: false, message: "Not Authenticated" });
        }
        const userId = user._id;

        const deletedUser = await Employer.findByIdAndDelete(userId);
        if (!deletedUser) {
            return res.status(404).json({ success: false, message: "User not found" });
        }
        await Job.deleteMany({ postedBy: userId });
        return res.status(200).json({
            success: true,
            message: "Your account and all associated job postings have been deleted successfully",
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ success: false, message: error.message });
    }
};

const checkAuthHandler = async (req, res) => {
    try {
        const user = req.user;
        if (!user || !user._id) {
            return res.status(401).json({ success: false, message: "Not Authenticated" });
        }

        res.status(200).json({
            success: true,
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                companyName: user.companyName,
                websiteUrl: user.websiteUrl,
                role: user.role,
            },
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ success: false, message: error.message });
    }
};

module.exports = { employerLoginHandler, employerSignupHandler, deleteEmpAccout, checkAuthHandler };