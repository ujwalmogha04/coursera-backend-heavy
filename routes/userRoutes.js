const { Router } = require("express");
const userRouter = Router();
const { userSigninSchema, userSignupSchema } = require("../schemas/userSchema");
const { UserModel } = require("../db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {JWT_USER_SECRET} = require("../config")
const{userMiddleware} = require("../middlewares/user")

userRouter.post("/signup", async (req, res) => {
    const { name, email, password } = req.body;

    const validateSchema = userSignupSchema.safeParse({ email, name, password });

    if (!validateSchema.success) {
        return res.status(400).json({
            message: "validation failed",
            error: validateSchema.error.errors
        })
    }

    try {

        const exisitingUser = await UserModel.findOne({ email });

        if (exisitingUser) {
            return res.status(409).json({
                message: "user already exists"
            });

        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await UserModel.create({
            name,
            email,
            password: hashedPassword,
        })

        res.status(201).json({
            message: "you have signed up successfully"
        })
    } catch (e) {
        return res.status(500).json({
            message: "server error",
            error: e.message
        })
    }
})

userRouter.post("/signin", async (req, res) => {
    const { email, password } = req.body;

    const validateSchema = userSigninSchema.safeParse({ email, password });

    if (!validateSchema.success) {
        return res.status(400).json({
            message: "validation failed",
            error: validateSchema.error.errors
        })
    }

    try {

        const userExists = await UserModel.findOne({ email });

        if (!userExists) {
            return res.status(403).json({
                message: "user does not exist"
            })
        }

        const matchedPassword = await bcrypt.compare(password, userExists.password);

        if (!matchedPassword) {
            return res.status(403).json({
                message: "Invalid credentials"
            })
        }

        const token = jwt.sign({
            id : userExists._id
        }, JWT_USER_SECRET,
        );

        return res.status(200).json({
            token,
            message: "You have successfully signed in",

        });

    } catch (e) {
        res.status(500).json({
            message: "server error"
        })
    }

})

userRouter.get("/purchases", (req, res) => {

})

module.exports = {
    userRouter
}