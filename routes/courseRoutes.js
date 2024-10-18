const { Router } = require("express");
const { PurchaseModel, CourseModel } = require("../db");
const { userMiddleware } = require("../middlewares/user");
const courseRouter = Router();

courseRouter.post("/purchase", userMiddleware, async (req, res) => {
    const userId = req.userId;
    const courseId = req.body.courseId;

    if (!courseId) {
        return res.status(400).json({
            message: "courseId is required"
        });
    }

    try {
        const alreadyPurchased = await PurchaseModel.findOne({ userId, courseId });

        if (alreadyPurchased) {
            return res.status(400).json({
                message: "you have already purchased this course"
            })
        }

        //we should also check if user has actually paid the price of the course

        await PurchaseModel.create({
            userId,
            courseId
        })

        return res.status(201).json({
            message: "you have succesfully Purchased the course"
        })

    } catch (e) {
        return res.status(500).json({
            message: "server error",
            error: e.message

        })
    }
})

courseRouter.get("/preview", async (req, res) => {
    try {
        const courses = await CourseModel.find({})

        return res.status(200).json({
            courses
        })
    } catch (e) {
        return res.status(500).json({
            message: "server error",
            error: e.message
        })
    }

})

module.exports = {
    courseRouter
}