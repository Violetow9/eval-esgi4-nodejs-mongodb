const express = require("express");
const router = express.Router();
const postController = require('./../controller/post.controller.js');
const authMiddleware = require('./../middleware/auth.middleware.js');

router.post('/', authMiddleware, postController.create);
router.put('/:id', authMiddleware, postController.update);
router.get('/', postController.getAll);
router.delete('/:id', authMiddleware, postController.delete);

module.exports = router;