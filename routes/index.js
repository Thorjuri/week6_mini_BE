const express = require('express');
const router = express.Router();
const postRouter = require('./posts.route.js');
const usersRouter = require('./users.route.js')
const commentRouter = require('./comments.route.js')

//전역 미들웨어

router.use("/posts", postRouter);
router.use("/users", usersRouter);
router.use("/comments", commentRouter);

module.exports = router; 