const mongoose = require("mongoose")

const profileSchema = new mongoose.Schema({

    profileId: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    profilePicUrl: {
        type: String,
        default: "http://localhost:5001/public/defaultPic.png"
    },
    username: {
        type: String,
        required: true,
        ref:"User"
    },
    email: {
        type: String,
        required: true,
        unique: true,
        ref:"User",
        match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address"],
    },
    bio: {
        type: String,
        trim: true,
        maxlength: 150,
        required:true
    },
    skills: {
        type: [String], // Array of strings
        required:true
    },
    experience: {
        type: String,
        enum: ["Fresher", "1-3 years", "3-5 years", "5-10 years", "10+ years"], // Restrict to these values
        required: true,
    },

    githubUrl: {
        type: String,
    },
    linkedinUrl: {
        type: String,
    }
},{timestamps:true});

const Profile = mongoose.model("profile", profileSchema)

module.exports = { Profile }

