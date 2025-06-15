const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema(
  {
    jobId: {
      type: String,
      required: true,
      unique: true, // Enforce uniqueness
    },
    applicants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
      },
    ],
    selectedApplicants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
      },
    ],
    jobTitle: {
      type: String,
      required: true,
    },
    jobDescription: {
      type: String,
      required: true,
    },
    companyName: {
      type: String,
      required: true,
      ref: "employer",
    },
    location: {
      type: String,
      required: true,
    },
    employmentType: {
      type: String,
      enum: ["Full-time", "Part-time", "Contract", "Temporary", "Internship"],
      required: true,
    },
    salaryRange: {
      min: {
        type: Number,
        required: true,
      },
      max: {
        type: Number,
        required: true,
      },
    },
    skillsRequired: {
      type: [String],
      required: true,
    },
    isOpen: {
      type: Boolean,
      default: true,
      required: true,
    },
    postedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "employer",
      required: true,
    },
    postedAt: {
      type: Date,
      default: Date.now,
    },
    applicationDeadline: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);

const Job = mongoose.model("Job", jobSchema);

module.exports = { Job };