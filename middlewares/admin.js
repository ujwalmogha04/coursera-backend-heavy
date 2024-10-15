const jwt = require("jsonwebtoken");
const JWT_ADMIN_SECRET = require("../config");

function adminMiddleware(req, res, res) {
    const token = req.headers.authorization;

    if (!token) {
        return res.status(400).json({
            message: "token does not found "
        })
    }

    try {
        const decode = jwt.verify(token, JWT_ADMIN_SECRET);

        if (!decode) {
            return res.status(403).json({
                message: "invalid token"
            })
        } else {
            req.userId = decode.id;
            next();
        }
    }catch(e){
        return res.status(500).json({
            message : "server error"
        })
    }


}

module.exports = {
    adminMiddleware,
}