const express = require("express");
const router = express.Router();
const commentController = require('./../controller/comment.controller.js');
const authMiddleware = require('./../middleware/auth.middleware.js');

router.post('/', authMiddleware, commentController.create);
router.delete('/:id', authMiddleware, commentController.delete);
router.put('/:id', authMiddleware, commentController.update);

module.exports = router;