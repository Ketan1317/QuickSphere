const { User } = require("../Models/user");
const bcrypt = require("bcrypt")
const { createToken, verifyToken } = require("../Services/tokens");
const { Job } = require("../Models/job");



const userSignupHandler = async (req, res) => {
    try {
        console.log(req.body)
        const { username, email, password } = req.body;
        if (!username || !email || !password) {
            return res.status(401).json({ success: false, message: "Insufficient Credentials" })
        }

        const user = await User.findOne({ email });
        if (user) {
            return res.status(401).json({ success: false, message: "Email already in use" })
        }

        const hashedPass = await bcrypt.hash(password, 10);
        const userDetails = await User.create({
            username, password: hashedPass, email
        })
        const token = createToken(userDetails);
        res.status(200).json({ success: true, message: "Account created successfully", token, user: userDetails })

    } catch (error) {
        res.status(401).json({ success: false, message: error.message })
    }
}


const userLoginHandler = async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log(req.body)
        if (!email || !password) {
            return res.status(401).json({ success: false, message: "Insufficient Credentials" })
        }
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ success: false, message: "No user available with this email" })
        }
        const savedPass = user.password;
        const isCorrectPass = await bcrypt.compare(password, savedPass);
        if (!isCorrectPass) {
            return res.status(401).json({ success: false, message: "Incorrect Password" })
        }
        const token = createToken(user);
        res.status(200).json({ success: true, message: "Login successfully", token, user })

    } catch (error) {
        res.status(401).json({ success: false, message: error.message })

    }
}
const deleteUserAccount = async (req, res) => {
    try {
        const user = req.user;
        if (!user || !user._id) {
            return res.status(403).json({ success: false, message: "Not Authenticated" })
        }
        const userId = user._id;
        const deletedAcc = await User.findByIdAndDelete(userId);
        if (!deletedAccount) {
            return res.status(404).json({ success: false, message: "User not found" });
        }
        res.status(200).json({ success: true, message: "Account deleted Successfully" });


    } catch (error) {
        console.error(error.message)
        res.status(500).json({ success: false, message: error.message });

    }

}

const checkAuth = (req, res) => {
  try {
    const user = req.user;
    if (!user) {
      return res.status(401).json({ success: false, message: "User not authenticated" });
    }
    return res.status(200).json({ success: true, user });
  } catch (error) {
    console.error("checkAuth: Error:", error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};

const applyingForJob = async (req, res) => {
  try {
    const user = req.user;
    if (!user || !user._id) {
      return res.status(403).json({ success: false, message: "Not Authenticated" });
    }

    const userId = user._id;
    const jobId = req.params.jobId; 

    const job = await Job.findOne({ jobId });
    if (!job) {
      return res.status(404).json({ success: false, message: "Job not available" });
    }

    if (job.applicants.includes(userId)) {
      return res.status(400).json({ success: false, message: "You have already applied for this job" });
    }


    job.applicants.push(userId);
    await job.save();

    const userToUpdate = await User.findById(userId);
    userToUpdate.appliedJobs.push({ jobId: job._id }); // Store the job's MongoDB _id
    await userToUpdate.save();

    res.status(200).json({ success: true, message: "Successfully applied for the job" });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

const markJobFavourite = async (req, res) => {
    try {
        const user = req.user;
        if (!user || !user._id) {
            return res.status(403).json({ success: false, message: "Not Athenticated" })
        }
        const jobId = req.params.jobId;

        const userData = await User.findById(user._id);

        if (!userData) {
            return res.status(404).json({ success: false, message: "User not Found" })
        }

        if (userData.favJobs.includes(jobId)) {
            return res.status(400).json({ success: false, message: "Job already in favorites" });
        }

        userData.favJobs.push(jobId);
        await userData.save();

        res.status(200).json({ success: true, message: "Added to favourites successfully" });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ success: false, message: error.message })
    }

}

const unmarkJobFavourite = async (req, res) => {
    try {
        const user = req.user;
        if (!user || !user._id) {
            return res.status(403).json({ success: false, message: "Not Athenticated" })
        }
        const jobId = req.params.jobId;

        const userData = await User.findById(user._id);

        if (!userData) {
            return res.status(404).json({ success: false, message: "User not Found" })
        }

        if (!userData.favJobs.includes(jobId)) {
            return res.status(400).json({ success: false, message: "Job is not even in favorites" });
        }

        userData.favJobs = userData.favJobs.filter((Id) => Id.toString() !== jobId)
        await userData.save();

        res.status(200).json({ success: true, message: "Removed from favourites" });

    } catch (error) {
        console.error(error.message);
        res.status(500).json({ success: false, message: error.message })
    }

}

const getFavouriteJobs = async (req, res) => {
    try {
        const user = req.user;
        if (!user || !user._id) {
            return res.status(403).json({ success: false, message: "User not Found" })
        }

        const userData = await User.findById(user._id).populate("favJobs");

        if (!userData) {
            return res.status(404).json({ success: false, message: "No Such User is available" })
        }

        res.status(200).json({ success: true, favJobs: userData.favJobs });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ success: false, message: error.message })
    }
}

const getAllJobsAppliedFor = async (req, res) => {
    try {
        const user = req.user;
        if (!user || !user._id) {
            return res.status(403).json({ success: false, message: "User not Found" })
        }

        const userData = await User.findById(user._id).populate("appliedJobs");

        if (!userData) {
            return res.status(404).json({ success: false, message: "No Such User is available" })
        }

        res.status(200).json({ success: true, appliedJobs: userData.appliedJobs });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ success: false, message: error.message })
    }

}



module.exports = { checkAuth, userLoginHandler,deleteUserAccount , userSignupHandler, applyingForJob, markJobFavourite, unmarkJobFavourite, getAllJobsAppliedFor, getFavouriteJobs }