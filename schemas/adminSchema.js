const {z} = require("zod"); 

const adminSignupSchema = z.object({
    name: z.string().min(3),
    email: z.string().email(),
    password: z.string().min(8).max(20),
})

const adminSigninSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8).max(20),
})

const adminCourseSchema = z.object({
    title : z.string(),
    description : z.string(),
    price : Number(),
    imageUrl : z.string()
})

module.exports = {
    adminSigninSchema ,
    adminSignupSchema,
    adminCourseSchema
}