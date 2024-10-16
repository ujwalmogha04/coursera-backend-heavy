const { Router } = require("express");
const adminRouter = Router();
const { AdminModel, CourseModel } = require("../db");
const bcrypt = require("bcrypt");
const { adminSignupSchema, adminSigninSchema, adminCourseSchema } = require("../schemas/adminSchema");
const { adminMiddleware } = require("../middlewares/admin");
const jwt = require("jsonwebtoken");
const { JWT_ADMIN_SECRET } = require("../config");



adminRouter.post("/signup", async (req, res) => {
    const { name, email, password } = req.body;

    const validateSchema = adminSignupSchema.safeParse({ name, email, password })

    if (!validateSchema.success) {
        return res.status(400).json({
            message: "Validation failed",
            errors: validateSchema.error.errors
        })
    }

    try {

        const exisitingUser = await AdminModel.findOne({ email });

        if (exisitingUser) {
            return res.status(409).json({
                message: "user already exists"
            })
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        await AdminModel.create({
            name: name,
            email: email,
            password: hashedPassword
        })

        return res.status(201).json({
            message: "you have succesfully signed up"
        })

    } catch (error) {
        return res.status(500).json({
            message: "server error",
            error: error.message
        })
    }
})

adminRouter.post("/signin", async (req, res) => {
    const { email, password } = req.body;

    const validateSchema = adminSigninSchema.safeParse({ email, password });

    if (!validateSchema.success) {
        return res.status(400).json({
            message: "Validation failed",
            errors: validateSchema.error.errors
        })
    };

    try {

        const userExists = await AdminModel.findOne({ email });

        if (!userExists) {
            return res.status(400).json({
                message: "User does not exists, signup first"
            })
        }

        const matchedPassword = await bcrypt.compare(password, userExists.password);

        if (!matchedPassword) {
            return res.status(403).json({
                message: "Invalid credentials"
            })
        }

        const token = jwt.sign({
            id: userExists._id
        }, JWT_ADMIN_SECRET)

        res.status(200).json({
            token,
            message: "you have successsfully signedin",
        })

    } catch (error) {
        return res.status(500).json({
            message: "server error",
            error: error.message
        })

    }
})

adminRouter.post("/course", adminMiddleware, async (req, res) => {
    const { title, description, imageUrl, creatorId, price } = req.body;

    const validateSchema = adminCourseSchema.safeParse({ title, description, imageUrl, creatorId, price });

    if (!validateSchema.success) {
        return res.status(400).json({
            message: "validation failed",
            errors: validateSchema.error.errors
        })
    }

    try {
        const course = await CourseModel.create({ title, description, imageUrl, creatorId, price });

        return res.status(201).json({
            message: "course created sucessfully",
            courseId : course._id
        })
    } catch (err) {
        return res.status(500).json({
            message: "server error",
            error: err.message
        })
    }
})

adminRouter.put("/course", adminMiddleware , async (req, res) => {
    
})

adminRouter.get("/course/bulk", (req, res) => {

})

module.exports = {
    adminRouter
}