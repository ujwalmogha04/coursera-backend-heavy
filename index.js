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

app.listen(3000);