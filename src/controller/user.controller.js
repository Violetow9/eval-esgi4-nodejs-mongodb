const jwt = require("jsonwebtoken");
const User = require("./../model/user.model.js");
const bcrypt = require("bcryptjs");
const { areObjectFieldsPresent } = require("../utils");

const exporter = {}

/**
 * Registers a new user to the db.
 * @param req
 * @param res
 * @returns {Promise<*>}
 */
exporter.signin = async (req, res) => {
    try {
        const requestBody = req.body

        if( !areObjectFieldsPresent(requestBody, ['email', 'password', 'pseudo']) ) {
            return res.status(400).json({ message: "Please enter an email, pseudo and password." })
        }

        const createdUser = await User.create({
            email: requestBody.email,
            pseudo: requestBody.pseudo,
            password: bcrypt.hashSync(requestBody.password, 10)
        })

        const userAsObject = {
            pseudo: createdUser.pseudo,
            email: createdUser.email,
            _id: createdUser._id
        }

        return res.status(201).json({
            user: userAsObject
        })
    } catch (e) {
        console.log(e)

        return res.status(500).json({
            message: "Server Error when signing in."
        })
    }
}

/**
 * Attempts to log in the user. If credentials are correct, the jwt token and some user infos
 * will be returned into the request.
 * @param req
 * @param res
 * @returns {Promise<*>}
 */
exporter.login = async (req, res) => {
    try {
        const requestBody = req.body

        const badCredentialsMessage = "Please enter a pseudo and a password."

        if( !requestBody.pseudo || requestBody.pseudo === "" || !requestBody.password || requestBody.password === "" ) {
            return res.status(401).json({ message: badCredentialsMessage })
        }

        const targetUser = await User.findOne({
            pseudo: requestBody.pseudo
        })

        if( !targetUser ) {
            return res.status(401).json({ message: badCredentialsMessage })
        }

        if( !bcrypt.compareSync(requestBody.password, targetUser.password) ) {
            return res.status(401).json({ message: badCredentialsMessage })
        }

        const userInfos = {
            email: targetUser.email,
            pseudo: targetUser.pseudo,
            _id: targetUser._id
        }

        const token = jwt.sign(
            userInfos,
            process.env.JWT_KEY,
            {
                expiresIn: "1H"
            }
        )

        return res.status(200).json({
            user: userInfos,
            jwt: token
        })

    } catch (e) {
        console.log(e)

        return res.status(500).json({
            message: "Server Error when logging in."
        })
    }
}

module.exports = exporter