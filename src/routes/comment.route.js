const express = require("express");
const router = express.Router();
const commentController = require('./../controller/comment.controller.js');

router.get('/:id',commentController.getById);
router.get('/post/:id',commentController.getByPostId);
router.get('/user/:id',commentController.getByUserId);

router.get('/',commentController.getAll);
router.delete('/:id',commentController.delete);

router.post('/', commentController.create);
router.put('/:id', commentController.update);

module.exports = router;