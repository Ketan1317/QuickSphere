const mongoose = require("mongoose")

const employerSchema = new mongoose.Schema({
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
    companyName:{
        type: String,
        required: true
    },
    websiteUrl : {
         type: String,
        required: true
    },
    role: {
        type: String,
        default: "employer" 
    }
},{timestamps:true});

const Employer = mongoose.model("employer",employerSchema)

module.exports = {Employer}

