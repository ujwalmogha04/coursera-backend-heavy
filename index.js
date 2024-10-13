const express = require("express");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const {userRouter} = require("./routes/userRoutes");
const {courseRouter} = require("./routes/courseRoutes");
const {adminRouter} = require("./routes/adminRoutes");

const app = express();

app.use("/api/v1/user" , userRouter)
app.use("/api/v1/admin" , adminRouter)
app.use("/api/v1/courses" , courseRouter)

async function main () {
    await mongoose.connect("mongodb+srv://Ujwal:Ujwal2510@merncluster.5dodjsu.mongodb.net/Coursera-App");
    app.listen(3000);
}

main();

