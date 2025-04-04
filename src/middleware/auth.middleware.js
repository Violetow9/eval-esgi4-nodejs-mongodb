const jwt = require("jsonwebtoken");

module.exports = (role) => {
    return (req, res, next) => {
        const token = req.headers?.authorization?.split(" ")[1];

        if (!token) {
            return res.status(401).json({
                'message': 'You must be logged in to do this action.'
            });
        }

        req.token = jwt.verify(token, process.env.JWT_KEY);

        if (!req.token) {
            return res.status(401).json({
                'message': 'You must be logged in to do this action.'
            });
        }
    }
}