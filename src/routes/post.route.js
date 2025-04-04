const express = require("express");
const router = express.Router();
const postController = require('./../controller/post.controller.js');

router.post('/', postController.create);
router.put('/:id', postController.update);
router.get('/', postController.getAll);
router.delete('/:id', postController.delete);

module.exports = router;