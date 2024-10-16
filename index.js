require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const {userRouter} = require("./routes/userRoutes");
const {courseRouter} = require("./routes/courseRoutes");
const {adminRouter} = require("./routes/adminRoutes");

const app = express();
app.use(express.json());

app.use("/api/v1/user" , userRouter)
app.use("/api/v1/admin" , adminRouter)
app.use("/api/v1/courses" , courseRouter)

async function main () {
    await mongoose.connect(process.env.MONGO_URL);
    app.listen(3000);
}

main();

