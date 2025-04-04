const express = require("express");
const router = express.Router();
const postController = require('./../controller/post.controller.js');

router.post('/', postController.create);
router.put('/:id', postController.update);
router.delete('/:id', postController.delete);
router.get('/', postController.getAll);

module.exports = router;