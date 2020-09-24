const config = require("config");
const jwt = require("jsonwebtoken");
const message = {
    noToken : "Token non fourni.",
    badToken : "Token fourni invalide."
}

function accessDenied(resp, message) {
    const objectMessage = {
        msg : `Accès refusé, ${message}`
    }
    return resp.status(401).send(objectMessage)
}

function auth (req, resp, next) {
    const token = req.header("x-auth-token");
    const secretKey = config.get("jwtCleSecrete");

    if (!token) {
        return accessDenied(resp, message.noToken)
    }
    try {
        req.user = jwt.verify(token, secretKey);
        return next();
    }
    catch (err) {
        return accessDenied(resp, message.badToken);
    }
}
module.exports = auth;