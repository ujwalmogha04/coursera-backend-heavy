const {z} = require("zod"); 

const userSignupSchema = z.object({
    name: z.string().min(3),
    email: z.string().email(),
    password: z.string().min(8).max(20),
})

const userSigninSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8).max(20),
})

module.exports = {
    userSignupSchema,
    userSigninSchema
}