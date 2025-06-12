const express = require("express");
const { userLoginHandler, userSignupHandler, checkAuth, applyingForJob, markJobFavourite, unmarkJobFavourite, getFavouriteJobs, getAllJobsAppliedFor } = require("../Controllers/userController");
const { employerLoginHandler, employerSignupHandler, deleteEmpAccout } = require("../Controllers/employerController");
const { protectRoutes } = require("../Middlewares/auth");
const { verifyRole } = require("../Middlewares/roleBasedAuth");
const { getAllJobs } = require("../Controllers/jobHandler");
const { handleProfileChange, getAllProfiles, getShortlistedEmployers } = require("../Controllers/profileController");
const UserRouter = express.Router();

UserRouter.post("/user-login",userLoginHandler)
UserRouter.post("/user-signup",userSignupHandler)
// DELETE 
UserRouter.post("/applying-4-job/:jobId",protectRoutes,verifyRole("jobSeeker"),applyingForJob)

UserRouter.get("/getall-jobs/:jobId",protectRoutes,verifyRole("jobSeeker"),getAllJobs)
UserRouter.get("/getall-profiles",protectRoutes,verifyRole("jobSeeker"),getAllProfiles)
UserRouter.get("/shortlistedList",protectRoutes,verifyRole("jobSeeker"),getShortlistedEmployers)
UserRouter.get("/get-Fav-jobs",protectRoutes,verifyRole("jobSeeker"),getFavouriteJobs)
UserRouter.get("/get-jobs-applied4",protectRoutes,verifyRole("jobSeeker"),getAllJobsAppliedFor)


UserRouter.post("/update-profile",protectRoutes,verifyRole("jobSeeker"),handleProfileChange)
UserRouter.post("/delete-userAcc",protectRoutes,verifyRole("jobSeeker"),deleteEmpAccout)


UserRouter.post("/mark-favourite",protectRoutes,verifyRole("jobSeeker"),markJobFavourite)
UserRouter.post("/unmark-favourite",protectRoutes,verifyRole("jobSeeker"),unmarkJobFavourite)


UserRouter.get("/just-test",(req,res) => {
    res.send("working")
})


UserRouter.get("/check-auth",protectRoutes,checkAuth)


module.exports = {UserRouter}