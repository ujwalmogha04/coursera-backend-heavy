const ratelimiter = require("express-rate-limit");

const apilimiter = ratelimiter({
         windowMs : 3600000,
         max : 3,
         message : {
            status : 429,
            message : "Too many requests, please try again later."
         }

});


module.exports = {
    apilimiter
}