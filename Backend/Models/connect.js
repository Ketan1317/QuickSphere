const mongoose = require("mongoose");

const connectDatabase = async () => {
    try {
        mongoose.connect(`${process.env.MONGO_DB_URL}/HireSphere`);
    console.log("MongoDB Connected Successfully")
    } catch (error) {
        console.log("Error is connecting the DataBase");
        console.error(error.message);
    }
}

module.exports = {connectDatabase}