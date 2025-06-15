const { Profile } = require("../Models/profile");
const { User } = require("../Models/user");

const handleProfileChange = async (req, res) => {
    try {
        const user = req.user;
        if (!user || !user._id) {
            return res.status(403).json({ success: false, message: "Not Authenticated" });
        }

        const { bio, skills, experience, githubUrl, linkedinUrl, profileSlugId } = req.body;

        if (!bio || !skills || !Array.isArray(skills) || !experience || !profileSlugId) {
            return res.status(400).json({ success: false, message: "Invalid or incomplete details" });
        }

        const existingProfile = await Profile.findOne({ profileId: user._id });
        let profileData;

        if (existingProfile) {
            profileData = await Profile.findByIdAndUpdate(
                existingProfile._id,
                {
                    bio,
                    skills,
                    experience,
                    githubUrl,
                    linkedinUrl,
                    profileSlugId,
                },
                { new: true, runValidators: true }
            ).populate("profileId", "username email");
        } else {
            const userDoc = await User.findById(user._id);
            profileData = await Profile.create({
                profileId: user._id,
                username: userDoc.username,
                email: userDoc.email,
                bio,
                skills,
                experience,
                githubUrl,
                linkedinUrl,
                profileSlugId,
            });
        }

        res.status(200).json({ success: true, profileData });
    } catch (error) {
        console.error(error.message);
        if (error.code === 11000) {
            return res.status(400).json({ success: false, message: "Profile slug ID or email already exists" });
        }
        res.status(500).json({ success: false, message: error.message });
    }
};

const getUserProfile = async (req, res) => {
    try {
        const user = req.user;
        console.log("trying to fetch profile");
        if (!user || !user._id) {
            return res.status(403).json({ success: false, message: "Not Authenticated" });
        }

        const UserSpecificProfile = await Profile.findOne({ profileId: user._id }).populate("profileId", "username email");
        if (!UserSpecificProfile) {
            return res.status(404).json({ success: false, message: "Profile does not exist" });
        }

        return res.status(200).json({ success: true, UserSpecificProfile });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ success: false, message: error.message });
    }
};

const getAllProfiles = async (req, res) => {
    try {
        const user = req.user;
        console.log(user);
        if (!user || !user._id) {
            return res.status(403).json({ success: false, message: "Not Authenticated" });
        }

        const allProfilesData = await Profile.find({}).populate("profileId", "username email");
        res.status(200).json({ success: true, allProfilesData });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ success: false, message: error.message });
    }
};

const findProfileBySlug = async (req, res) => {
    try {
        const user = req.user;
        if (!user || !user._id) {
            return res.status(403).json({ success: false, message: "Not Authenticated" });
        }

        const  profileSlugId  = req.params.slug;

        const profileBySlug = await Profile.findOne({ profileSlugId }).populate("profileId", "username email");

        if (!profileBySlug) {
            return res.status(404).json({ success: false, message: "Profile does not exist" });
        }

        return res.status(200).json({ success: true, profileBySlug });
    } catch (error) {
        console.error("findProfileBySlug error:", error.message);
        res.status(500).json({ success: false, message: error.message });
    }
};

const profileShortlisted = async (req, res) => {
  try {
    const user = req.user;
    if (!user || !user._id) {
      return res.status(403).json({ success: false, message: "Not Authenticated" });
    }

    const userId = user._id; // Employer ID
    const { profileId } = req.body;
    if (!profileId) {
      return res.status(400).json({ success: false, message: "Profile ID is required to shortlist a profile" });
    }

    const profile = await Profile.findById(profileId);
    if (!profile) {
      return res.status(404).json({ success: false, message: "No such profile exists" });
    }

    if (profile.shortlistedBy.includes(userId)) {
      return res.status(400).json({ success: false, message: "You have already shortlisted this profile" });
    }

    profile.shortlistedBy.push(userId);
    await profile.save();

    res.status(200).json({
      success: true,
      message: `You have successfully shortlisted ${profile.username}'s profile.`,
      profile,
    });
  } catch (error) {
    console.error("Error in profileShortlisted:", error.message);
    res.status(500).json({ success: false, message: "Server error while shortlisting profile" });
  }
};
const getShortlistedEmployers = async (req, res) => {
    try {
        const user = req.user;
        if (!user || !user._id) {
            return res.status(403).json({ success: false, message: "Not Authenticated" });
        }
        const userId = user._id;

        const profile = await Profile.findOne({ profileId: userId }).populate("shortlistedBy", "username email companyName");
        if (!profile) {
            return res.status(404).json({ success: false, message: "Profile Not Found" });
        }
        const listOfEmployers = profile.shortlistedBy;
        res.status(200).json({ success: true, listOfEmployers });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ success: false, message: error.message });
    }
};

const getProfileBy_id = async (req, res) => {
  try {
    const user = req.user;
    if (!user || !user._id) {
      return res.status(403).json({ success: false, message: "Not Authenticated" });
    }

    const profileId = req.params.profileId;

    const profile = await Profile.findById(profileId)

    if (!profile) {
      return res.status(404).json({ success: false, message: "Profile not found" });
    }

    res.status(200).json({ success: true, profile });
  } catch (error) {
    console.error("Error in getProfileBy_id:", error.message);
    res.status(500).json({ success: false, message: "Server error while fetching profile" });
  }
};

module.exports = { getAllProfiles, getUserProfile,getProfileBy_id, findProfileBySlug, handleProfileChange, profileShortlisted, getShortlistedEmployers };