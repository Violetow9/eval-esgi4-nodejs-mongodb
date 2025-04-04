const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = (role) => {
    return (req, res, next) => {
        const token = req.headers?.authorization?.split(" ")[1];

        if (!token) {
            res.status(401).json({
                'message': 'You must be logged in to do this action.'
            });
            return;
        }

        req.token = jwt.verify(token, process.env.JWT_KEY);

        if (!req.token) {
            res.status(401).json({
                'message': 'You must be logged in to do this action.'
            });
            return;
        }
        
    }
}