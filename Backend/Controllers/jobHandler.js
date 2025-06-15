const express = require("express");
const { Job } = require("../Models/job");
const { getAllProfiles } = require("./profileController");
const { Employer } = require("../Models/employer");

const createJob = async (req, res) => {
  try {
    const user = req.user;
    if (!user || !user._id) {
      return res.status(401).json({ success: false, message: "Not Authenticated" });
    }

    const userId = user._id;
    const jobId = req.params.jobId; // Slug from the route

    const {
      jobTitle,
      jobDescription,
      location,
      isOpen = true, 
      employmentType,
      salaryRange,
      skillsRequired,
      applicationDeadline,
      companyName
    } = req.body;

    // Validate required fields
    if (
      !jobId ||
      !jobTitle ||
      !jobDescription ||
      !location ||
      !employmentType ||
      !salaryRange ||
      !skillsRequired ||
      !applicationDeadline || !companyName
    ) {
      return res.status(400).json({ success: false, message: "All fields are required." });
    }

    // Validate salaryRange structure
    if (!salaryRange.min || !salaryRange.max) {
      return res.status(400).json({ success: false, message: "Salary range must include both minimum and maximum values." });
    }

    // Validate salary range logic
    if (salaryRange.min >= salaryRange.max) {
      return res.status(400).json({ success: false, message: "Minimum salary must be less than maximum salary." });
    }


    // Validate skillsRequired is a non-empty array
    if (!Array.isArray(skillsRequired) || skillsRequired.length === 0) {
      return res.status(400).json({ success: false, message: "Skills required must be a non-empty array." });
    }

    // Validate applicationDeadline is a future date
    const deadline = new Date(applicationDeadline);
    const now = new Date(); 
    if (isNaN(deadline.getTime()) || deadline <= now) {
      return res.status(400).json({
        success: false,
        message: "Application deadline must be a valid future date.",
      });
    }

    const job = await Job.create({
      jobId, 
      jobTitle,
      jobDescription,
      location,
      employmentType,
      companyName, 
      isOpen,
      salaryRange: {
        min: salaryRange.min,
        max: salaryRange.max,
      },
      skillsRequired,
      postedBy: userId,
      postedAt: new Date(),
      applicationDeadline: deadline,
    });

    res.status(201).json({ success: true, message: "Job posted successfully.", job });
  } catch (error) {
    console.error("createJob error:", error.message);
    if (error.code === 11000) {
      // Duplicate key error (e.g., jobId already exists)
      return res.status(400).json({
        success: false,
        message: "Job ID already exists. Please use a unique Job ID.",
      });
    }
    res.status(500).json({ success: false, message: error.message });
  }
};



const updateJob = async (req, res) => {
    try {
        const user = req.user;
        if (!user || !user._id) {
            return res.status(401).json({ success: false, message: "Not Authenticated" });
        }

        const jobId = req.params.jobId;
        const {
            jobTitle,
            jobDescription,
            location,
            employmentType,
            isOpen,
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
            return res.status(401).json({ success: false, message: "At least one field is required for updating" });
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
                isOpen,
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
//

const getJobBySlug = async (req, res) => {
    try {
        const user = req.user;
        if (!user || !user._id) {
            return res.status(401).json({ success: false, message: "Not Authenticated" });
        }
        const userId = user._id;
        const JobId = req.params.jobId;

        const jobBySlug = await Job.findOne({ jobId:JobId })
            .populate("postedBy", "companyName");

        res.status(200).json({ success: true, jobBySlug });

    } catch (error) {
        console.error(error.message);
        res.status(500).json({ success: false, message: error.message });
    }
}

const getEmployerSpecificJobs = async (req, res) => {
    try {
        const user = req.user;
        if (!user || !user._id) {
            return res.status(401).json({ success: false, message: "Not Authenticated" });
        }
        console.log("jobs ke andr")
        const userId = user._id;

        const userSpecificJobs = await Job.find({ postedBy: userId })
            .populate("applicants", "username email") // Replace ObjectId with the User documents (include only username and email)

        res.status(200).json({ success: true, userSpecificJobs });

    } catch (error) {
        console.error(error.message);
        res.status(500).json({ success: false, message: error.message });
    }
}

const getAllJobs = async (req, res) => {
    try {
        const user = req.user;
        console.log("trying to fetch jobs")
        if (!user || !user._id) {
            return res.status(401).json({ success: false, message: "Not Authenticated" });
        }
        const allJobs = await Job.find({ isOpen: true }).populate("postedBy", "companyName email");
        // console.log(allJobs)
        res.status(200).json({ success: true, allJobs });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ success: false, message: error.message });
    }
}

const getApplicants = async (req, res) => {
  try {
    const user = req.user;
    if (!user || !user._id) {
      return res.status(401).json({ success: false, message: "Not Authenticated" });
    }

    const jobId = req.params.jobId; // Custom jobId from the URL
    const employerId = user._id; // Employer who is requesting the applicants

    const job = await Job.findOne({ jobId, postedBy: employerId }).populate(
      "applicants",
      "username email"
    );

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found or you are not authorized to view its applicants",
      });
    }

    const applicants = job.applicants;
    res.status(200).json({ success: true, applicants });
  } catch (error) {
    console.error("Error in getApplicants:", error.message);
    res.status(500).json({ success: false, message: "Server error while fetching applicants" });
  }
};

const selectTheApplicant = async (req, res) => {
    try {
        const user = req.user;
        if (!user || !user._id) {
            return res.status(401).json({ success: false, message: "Not authorized" });
        }
        // ja render krenge usmein se uthayenge
        const { userId } = req.body;
        const jobId = req.params.jobId;

        const job = await Job.findById(jobId)
        if (!job) {
            return res.status(404).json({ success: false, message: "Job not found" });
        }

        if (!job.applicants.includes(userId)) {
            return res.status(401).json({ success: false, message: "User has not applied for this job", });
        }

        if (job.selectedApplicants.includes(userId)) {
            return res.status(401).json({
                success: false,
                message: "User already selected for this job",
            });
        }

        job.selectedApplicants.push(userId);
        await job.save();

        res.status(200).json({ success: true, message: `User with ID ${userId} successfully selected for the job "${job.jobTitle}`, });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ success: false, message: "Server error." });
    }
};
const rejectTheApplicant = async (req, res) => {
    try {
        const user = req.user;
        if (!user || !user._id) {
            return res.status(401).json({ success: false, message: "Not authorized" });
        }
        // ja render krenge usmein se uthayenge
        const { userId } = req.body;
        const jobId = req.params.jobId;

        const job = await Job.findById(jobId);
        if (!job) {
            return res.status(404).json({ success: false, message: "Job not found" });
        }

        if (!job.applicants.includes(userId)) {
            return res.status(401).json({ success: false, message: "User has not applied for this job", });
        }

        if (job.selectedApplicants.includes(userId)) {
            return res.status(401).json({
                success: false,
                message: "User already selected for this job",
            });
        }

        job.applicants = job.applicants.filter((applicantId) => applicantId.toString() !== userId); // yaha vo user applicants list se nikal denge jo rejct kiya gya hai
        await job.save();

        res.status(200).json({ success: true, message: `User with ID ${userId} successfully selected for the job "${job.jobTitle}`, });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ success: false, message: "Server error." });
    }

}


// chatGpt
const closeExpiredJobs = async (req, res) => {
    try {
        const currentDate = new Date(); // Get current date and time

        // Update jobs that are open and past the application deadline
        const expiredJobs = await Job.updateMany(
            { isOpen: true, applicationDeadline: { $lt: currentDate } },
            { isOpen: false }
        );

        res.status(200).json({
            success: true,
            message: `${expiredJobs.modifiedCount} job postings closed due to expiration.`,
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ success: false, message: "Server error." });
    }
};

const togglePosting = async (req, res) => {
    try {
        const user = req.user;
        if (!user || !user._id) {
            return res.status(401).json({ success: false, message: "Not Authenticated" });
        }

        const jobId = req.params.jobId;
        const { isOpen } = req.body;

        const updatedPosting = await Job.findOneAndUpdate({ jobId }, { isOpen }, { new: true });

        if (!updatedPosting) {
            return res.status(404).json({ success: false, message: "Job posting not found or unauthorized" });
        }
        const action = isOpen ? "opened" : "closed";
        res.status(200).json({ success: true, message: `Job posting ${action} successfully.`, updatedPosting });

    } catch (error) {
        console.error(error.message);
        res.status(500).json({ success: false, message: error.message });
    }
};

const deleteJobPosting = async (req, res) => {
    try {
        const user = req.user;
        if (!user || !user._id) {
            return res.status(401).json({ success: false, message: "Authentication failed. Please log in and try again." });
        }

        const userId = user._id;

        const deletedJob = await Job.findOneAndDelete({ postedBy: userId });
        if (!deletedJob) {
            return res.status(404).json({ success: false, message: "No job posting found to delete" });
        }

        res.status(200).json({
            success: true, message: `The job titled as '${deletedJob.jobTitle}' has been successfully deleted.`,
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ success: false, message: error.message });
    }
};




module.exports = { createJob, updateJob, rejectTheApplicant,getJobBySlug, getEmployerSpecificJobs, getAllJobs, deleteJobPosting, togglePosting, getApplicants, selectTheApplicant, closeExpiredJobs };
