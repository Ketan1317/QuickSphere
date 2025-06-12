const express = require("express");
const { Job } = require("../Models/job");
const { getAllProfiles } = require("./profileController");

const createJob = async (req, res) => {
    try {
        const user = req.user;
        if (!user || !user._id) {
            return res.status(401).json({ success: false, message: "Not Authenticated" });
        }

        const userId = user._id;

        const { jobId } = req.params;   // it will be a slug
        const {
            jobTitle,
            jobDescription,
            location,
            employmentType,
            salaryRange,
            skillsRequired,
            applicationDeadline,
        } = req.body;

        // Validate required fields
        if (
            !jobTitle ||
            !jobDescription ||
            !location ||
            !employmentType ||
            !salaryRange ||
            !skillsRequired ||
            !applicationDeadline
        ) {
            return res.status(400).json({ success: false, message: "All fields are required." });
        }

        const job = await Job.create({
            jobId: jobId, // it will be a slug
            jobTitle,
            jobDescription,
            location,
            employmentType,
            salaryRange,
            skillsRequired,
            postedBy: user._id,
            companyName: user.companyName,
            postedAt: new Date(),
            applicationDeadline: new Date(applicationDeadline),
        });


        res.status(201).json({ success: true, message: "Job posted successfully.", job });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ success: false, message: error.message });
    }
};


const updateJob = async (req, res) => {
    try {
        const user = req.user;
        if (!user || !user._id) {
            return res.status(401).json({ success: false, message: "Not Authenticated" });
        }

        const { jobId } = req.params;
        const {
            jobTitle,
            jobDescription,
            location,
            employmentType,
            salaryRange,
            skillsRequired,
            applicationDeadline
        } = req.body;

        // Validate required fields
        if (
            !jobTitle &&
            !jobDescription &&
            !location &&
            !employmentType &&
            !salaryRange &&
            !skillsRequired &&
            !applicationDeadline
        ) {
            return res.status(400).json({ success: false, message: "At least one field is required for updating" });
        }

        const job = await Job.findById(jobId);
        if (!job) {
            return res.status(404).json({ success: false, message: "Job not found" });
        }

        if (job.postedBy !== user.username) {
            return res.status(403).json({ success: false, message: "You are not authorized to edit this job" });
        }

        const updatededJob = await Job.findByIdAndUpdate(
            jobId,
            {
                jobTitle,
                jobDescription,
                location,
                employmentType,
                salaryRange,
                skillsRequired,
                applicationDeadline: applicationDeadline ? new Date(applicationDeadline) : job.applicationDeadline, // agar nayi hai to dedo varna purani hi chlegi
            },
            { new: true }
        );

        res.status(200).json({ success: true, message: "Job updated successfully.", updatededJob });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ success: false, message: error.message });
    }
};


const getEmployerSpecificJobs = async (req, res) => {
    try {
        const user = req.user;
        if (!user || !user._id) {
            return res.status(401).json({ success: false, message: "Not Authenticated" });
        }
        const userId = user._id;

        const userSpecificJobs = await Job.findById({ postedBy: userId });
        res.status(200).json({ success: true, userSpecificJobs });

    } catch (error) {
        console.error(error.message);
        res.status(500).json({ success: false, message: error.message });
    }
}

const getAllProfiles = async (req,res) => {
    try {
        const user = req.user;
        if (!user || !user._id) {
            return res.status(401).json({ success: false, message: "Not Authenticated" });
        }
        const allJobs = await Job.find({});
        res.status(200).json({ success: true, allJobs });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ success: false, message: error.message });
    }

}

module.exports = { createJob, updateJob, getEmployerSpecificJobs, getAllJobs };
