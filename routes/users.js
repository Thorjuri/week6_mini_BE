const express = require('express');
const router = express.Router();

const UserController = require('../controllers/userController');
const userController = new UserController();

const upload = require('../middlewares/upload_image')
const authMiddleware = require("../middlewares/auth_middleware");
// const user_validation = require('../validation/user_validation')


// 1.회원가입 
router.post('/signup', userController.createUser)

// 2. 회원가입 - 아이디 중복확인
router.post('/checkId', userController.duplicatedId);

// 3. 회원가입 - 닉네임 중복확인
router.post('/checkname', userController.duplicatedNickname);

//4.로그인(토큰 발급)
router.post('/login' ,userController.login);

// 5. 마이페이지 (내 정보, 좋아요한 글)
router.get('/:userId', authMiddleware, userController.getUserPage);

// 6. 유저 프로필 수정
router.put('/:userId/update', authMiddleware, userController.updateUser);



module.exports = router;
