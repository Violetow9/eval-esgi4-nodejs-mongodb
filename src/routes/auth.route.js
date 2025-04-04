const express = require("express");
const router = express.Router();
const userController = require('./../controller/user.controller.js');

router.post('/signin', userController.signin);
router.post('/login', userController.login);

module.exports = router;