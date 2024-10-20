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

        res.cookie( "token" , token , {
             httpOnly : true,
             secure: process.env.NODE_ENV === 'production',
             maxAge : 3600000
        })

        res.status(200).json({
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
    const { title, description, imageUrl, price } = req.body;
    const creatorId = req.adminId;
    const priceInPaise = price * 100;

    const validateSchema = adminCourseSchema.safeParse({ title, description, imageUrl, price : priceInPaise });

    if (!validateSchema.success) {
        return res.status(400).json({
            message: "validation failed",
            errors: validateSchema.error.errors
        })
    }

    try {
        const course = await CourseModel.create({ title, description, imageUrl, creatorId, price: priceInPaise });

        return res.status(201).json({
            message: "course created sucessfully",
            courseId: course._id
        })
    } catch (err) {
        return res.status(500).json({
            message: "server error",
            error: err.message
        })
    }
})

adminRouter.put("/course", adminMiddleware, async (req, res) => {
    const creatorId = req.adminId;
    const { courseId, title, description, price, imageUrl } = req.body;
    const priceInPaise = price * 100;
    const validateSchema = adminCourseSchema.safeParse({ courseId, title, description, price : priceInPaise , imageUrl});

    if (!validateSchema.success) {
        return res.status(400).json({
            message: "validation failed",
            error: validateSchema.error.errors
        })
    }

    try {
        const courseExists = await CourseModel.findOne({ _id: courseId, creatorId });

        if (!courseExists) {
            return res.status(404).json({
                message: "course does not exists"
            })
        }

        await CourseModel.updateOne({ _id: courseId, creatorId }, { title, description, price : priceInPaise, imageUrl });

        return res.status(200).json({
            message: "course updated succesfully",
            _id: courseId,
            title: title,
            description: description,
            price: priceInPaise ,
            imageUrl: imageUrl
        })

    } catch (e) {
        return res.status(500).json({
            message: "server error",
            error: e.message
        })
    }
})

adminRouter.get("/course/bulk", adminMiddleware, async (req, res) => {
    const creatorId = req.adminId;

    try {
        const courses = await CourseModel.find({ creatorId });

        if (courses.length === 0) {
            return res.status(200).json({
                courses : [],
                message: "No courses found for this admin"
            })
        }

        return res.status(200).json({
            courses,
            message: "courses fetched succesfully"
        })
    } catch (e) {
        return res.status(500).json({
            message: "server error",
            error: e.message
        })
    }
})

module.exports = {
    adminRouter
}