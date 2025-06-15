const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema(
  {
    profileId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    profileSlugId: {
      type: String,
      required: true,
      unique: true,
      match: [/^[a-z0-9-]+$/, "Profile slug ID must contain only lowercase letters, numbers, or hyphens"],
      trim: true,
    },
    profilePicUrl: {
      type: String,
      default: "http://localhost:3001/public/defaultPic.png",
    },
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address"],
    },
    bio: {
      type: String,
      trim: true,
      maxlength: 150,
      required: true,
    },
    skills: {
      type: [String],
      required: true,
    },
    shortlistedBy: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "employer",
      },
    ],
    experience: {
      type: String,
      enum: ["Fresher", "1-3 years", "3-5 years", "5-10 years", "10+ years"],
      required: true,
    },
    githubUrl: {
      type: String,
    },
    linkedinUrl: {
      type: String,
    },
  },
  { timestamps: true }
);

const Profile = mongoose.model("profile", profileSchema);

module.exports = { Profile };