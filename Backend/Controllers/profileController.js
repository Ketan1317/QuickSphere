const express = require("express");
const { Profile } = require("../Models/profile");

const handleProfileChange = async (req, res) => {
    try {
        const user = req.user;
        if (!user || !user._id) {
            return res.status(402).json({ success: false, message: "Not Authenticated" })
        }
        const userId = user._id;
        const { bio, skills, experience, githubUrl, linkedinUrl } = req.body;

        if (!bio || !skills || !Array.isArray(skills) || !experience) {
            return res.status(400).json({ success: false, message: "Insufficient or invalid details" });
        }

        let profileData;
        const isAlreadyExist = await Profile.findOne({ profileId: userId });
        if (isAlreadyExist) {
            profileData = await Profile.findByIdAndUpdate({ profileId: userId }, { bio, skills, experience, githubUrl, linkedinUrl }, { new: true })
        }
        else {
            profileData = await Profile.create({ bio, skills, experience, githubUrl, linkedinUrl, profileId: userId })
        }
        res.status(200).json({ success: true, message: "Profile updated successfully", profileData })

    } catch (error) {
        console.error(error.message);
        res.status(401).json({ success: false, message: error.message })
    }
}


const getAllProfiles = async (req, res) => {
    try {
        const user = req.user;
        if (!user || !user._id) {
            return res.status(402).json({ success: false, message: "Not Authenticated" })
        }

        const allProfilesData = await Profile.find({});
        res.status(200).json({ success: true, allProfilesData })

    } catch (error) {
        console.error(error.message);
        res.status(200).json({ success: true, message: error.message })

    }

}


module.exports = {getAllProfiles,handleProfileChange}