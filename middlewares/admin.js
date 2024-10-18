const jwt = require("jsonwebtoken");
const {JWT_ADMIN_SECRET} = require("../config");

function adminMiddleware(req, res, next) {
    const token = req.headers.authorization;

    if (!token) {
        return res.status(400).json({
            message: "Token not found "
        })
    }

    try {
        const decode = jwt.verify(token, JWT_ADMIN_SECRET);

        if (!decode) {
            return res.status(403).json({
                message: "invalid token"
            })
        }

        req.adminId = decode.id;
            next();
} catch (e) {
        return res.status(500).json({
            message: "server error",
            e : e.message
        })
    }


}

module.exports = {
    adminMiddleware,
}