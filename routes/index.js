const express = require('express');
const router = express.Router();
const postRouter = require('./posts.routes.js');
const usersRouter = require('./users.routes.js')
const commentRouter = require('./comments.js')

//전역 미들웨어

router.use("/posts", postRouter);
router.use("/users", usersRouter);
router.use("/comments", commentRouter);

module.exports = router; 