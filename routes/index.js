const express = require('express');
const router = express.Router();
const postRouter = require('./posts.js');
const usersRouter = require('./users.js');
const commentRouter = require('./comments.js');

//전역 미들웨어

// router.use('/posts', postRouter); // (머지전이라) exports가 아직 안되서 얘들은 꺼야 돌아감. 
// router.use('/users', usersRouter);
router.use('/comments', commentRouter);

module.exports = router;
