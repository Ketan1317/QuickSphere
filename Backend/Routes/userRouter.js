const express = require("express");
const { userLoginHandler, userSignupHandler, checkAuth, applyingForJob, markJobFavourite, unmarkJobFavourite, getFavouriteJobs, getAllJobsAppliedFor, deleteUserAccount } = require("../Controllers/userController");
const { protectRoutes } = require("../Middlewares/auth");
const { verifyRole } = require("../Middlewares/roleBasedAuth");
const { getAllJobs, getJobBySlug } = require("../Controllers/jobHandler");
const { handleProfileChange, getAllProfiles, getShortlistedEmployers, getUserProfile } = require("../Controllers/profileController");
const UserRouter = express.Router();

UserRouter.post("/jobSeeker-login",userLoginHandler)
UserRouter.post("/jobSeeker-signup",userSignupHandler)
// DELETE 
UserRouter.post("/applying-for-job/:jobId",protectRoutes,verifyRole("jobSeeker"),applyingForJob)

UserRouter.get("/getall-jobs",protectRoutes,verifyRole("jobSeeker"),getAllJobs)
UserRouter.get("/getall-profiles",protectRoutes,verifyRole("jobSeeker"),getAllProfiles)
UserRouter.get("/shortlistedList",protectRoutes,verifyRole("jobSeeker"),getShortlistedEmployers)
UserRouter.get("/get-Fav-jobs",protectRoutes,verifyRole("jobSeeker"),getFavouriteJobs)
UserRouter.get("/get-jobs-applied-for",protectRoutes,verifyRole("jobSeeker"),getAllJobsAppliedFor)
UserRouter.get("/get-job-by-slug/:jobId",protectRoutes,verifyRole("jobSeeker"),getJobBySlug)



UserRouter.post("/update-profile",protectRoutes,verifyRole("jobSeeker"),handleProfileChange)
UserRouter.get("/get-profile",protectRoutes,verifyRole("jobSeeker"),getUserProfile);

UserRouter.post("/jobSeeker-delAcc",protectRoutes,verifyRole("jobSeeker"),deleteUserAccount);


UserRouter.post("/mark-favourite/:jobId",protectRoutes,verifyRole("jobSeeker"),markJobFavourite)
UserRouter.post("/unmark-favourite/:jobId",protectRoutes,verifyRole("jobSeeker"),unmarkJobFavourite)


UserRouter.get("/just-test",(req,res) => {
    res.send("working")
})


UserRouter.get("/check-auth",protectRoutes,checkAuth)


module.exports = {UserRouter}