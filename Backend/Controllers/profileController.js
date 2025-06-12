
const { Profile } = require("../Models/profile");

const handleProfileChange = async (req, res) => {
    try {
        const user = req.user;
        if (!user || !user._id) {
            return res.status(403).json({ success: false, message: "Not Authenticated" })
        }
        const userId = user._id;
        const { bio, skills, experience, githubUrl, linkedinUrl } = req.body;

        if (!bio || !skills || !Array.isArray(skills) || !experience) {
            return res.status(401).json({ success: false, message: "Insufficient or invalid details" });
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
            return res.status(403).json({ success: false, message: "Not Authenticated" })
        }

        const allProfilesData = await Profile.find({});
        res.status(200).json({ success: true, allProfilesData })

    } catch (error) {
        console.error(error.message);
        res.status(500).json({ success: true, message: error.message })

    }

}

const profileShortlisted = async (req, res) => {
    try {
        const user = req.user;
        if (!user || !user._id) {
            return res.status(403).json({ success: false, message: "Not Authenticated" })
        }
        const userId = user._id;

        const { profileId } = req.body;
        if (!profileId) {
            return res.status(400).json({ success: false, message: "Profile ID is required to shortlist a profile" });
        }

        const profile = await Profile.findById(profileId);

        if (!profile) {
            return res.status(400).json({ success: false, message: "No Such Profile Present" });
        }

        if (profile.shortlistedBy.includes(userId)) {
            return res.status(400).json({ success: false, message: "You have already Shortlisted this Profile" });
        }

        profile.shortlistedBy.push(userId);
        await profile.save();

        res.status(200).json({ success: true, message: `You have successfully shortlisted ${profile.username}'s profile.`, profile, });


    } catch (error) {
        console.error(error.message);
        res.status(404).json({ success: false, message: error.message })
    }
}

const getShortlistedEmployers = async (req, res) => {
    try {
        const user = req.user;
        if (!user || !user._id) {
            return res.status(403).json({ success: false, message: "Not Authenticated" })
        }
        const userId = user._id;
        const profile = await Profile.find({profileId:userId}).populate("shortlistedBy", "username email companyName")
        if(!profile){
            return res.status(404).json({ success: false, message: "Profile Not Found" })
        }
        const listOfEmployers = profile.shortlistedBy;
        res.status(200).json({ success: true, listOfEmployers });

    } catch (error) {
        console.error(error.message);
        res.status(500).json({ success: false, message: error.message })
    }
}


module.exports = { getAllProfiles, handleProfileChange , profileShortlisted , getShortlistedEmployers }