const express = require('express');
const router = express.Router();

const UserController = require('../controllers/userController');
const userController = new UserController();

const authMiddleware = require("../middlewares/auth_middleware");
const user_validation = require('../validation/user_validation')


// 1.회원가입 (Joi validation)
router.post('/signup', user_validation.user_singup, userController.createUser);


//2.로그인(토큰 발급)
router.post('/login' ,userController.login);


// 3. 마이페이지 (내 정보, 좋아요한 글)
router.get('/:userId', authMiddleware, userController.getUser)


module.exports = router;
