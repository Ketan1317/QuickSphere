const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: "jobSeeker"
    },
    favJobs: [{
        jobId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Job", 
        }
    }],
    appliedJobs: [{
        jobId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Job", 
        }
    }]
}, { timestamps: true })

const User = mongoose.model("user", userSchema)

module.exports = { User }

