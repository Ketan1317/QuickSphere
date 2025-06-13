const express = require("express");
const dotenv = require("dotenv"); 
const path = require("path");
const cors = require("cors");
const { connectDatabase } = require("./Models/connect");
const { UserRouter } = require("./Routes/userRouter");
const { employRouter } = require("./Routes/employerRouter");

dotenv.config(); 

const PORT = process.env.BACKEND_PORT || 5001; 

const app = express();

app.use(express.json()); // Parse incoming JSON requests
app.use(cors());
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded data
// Middleware to serve static files from the "public" folder
app.use("/public", express.static(path.join(__dirname, "public")));

app.use("/api",UserRouter);
app.use("/emp",employRouter);

connectDatabase();


app.listen(PORT, () => console.log(`Server started at PORT: ${PORT}`));
