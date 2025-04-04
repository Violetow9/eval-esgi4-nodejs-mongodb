const express = require("express");
const router = express.Router();
const commentController = require('./../controller/comment.controller.js');

router.get('/:id',commentController.getById);
router.get('/post/:id',commentController.getByPostId);
router.get('/user/:id',commentController.getByUserId);

router.get('/',commentController.getAll);
router.delete('/:id', authMiddleware, commentController.delete);

router.post('/', authMiddleware, commentController.create);
router.put('/:id', authMiddleware, commentController.update);

module.exports = router;