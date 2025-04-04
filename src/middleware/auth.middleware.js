const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    const token = req.headers?.authorization?.split(" ")[1];

    if (!token) {
        return res.status(401).json({
            'message': "Vous devez indiquer un token d'authentification"
        });
    }

    req.token = jwt.verify(token, process.env.JWT_KEY);

    if (!req.token) {
        res.status(401).json({
            'message': 'Vous devez être connecté pour faire cette action.'
        });
    }

    next();
}