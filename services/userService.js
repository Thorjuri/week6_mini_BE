const UserRepository = require('../repositories/userRepository');
const jwt = require("jsonwebtoken");
require('dotenv').config()
const upload = require('../middlewares/upload_image.js')

class UserService {

    userRepository = new UserRepository();

    excptLogin = async(authorization)=> {
        const [authToken] = (authorization || "").split(" ");
        return authToken
      };


    createUser = async(authorization, fileData, userId, nickname, password) => {
        const status = await this.excptLogin(authorization); 
            
        if(status){ throw new Error('이미 로그인 되어 있습니다.')}; //예외처리. 이미 로그인 된 상태
        if(!userId || !nickname || !password){ throw new Error('필수 정보를 모두 입력해주세요')};  //예외처리. 공란

        if(!fileData) {
            //프로필 사진 없으면
            const createUserData = await this.userRepository.createUser(userId, nickname, password);
            return createUserData;

        } else if (fileData) {
            //프로필 사진 있으면
            const userPicture = fileData.location
            const createUserData = await this.userRepository.createUserWithImg(userId, userPicture, nickname, password);
            return createUserData;

        } else {
            throw new Error ('회원가입에 실패하였습니다.')
        }
    };


    duplicatedId = async(userId)=> {
        if(!userId){ throw new Error ("아이디를 입력하세요")}; //예외처리. 공란

        const duplicatedIdData = await this.userRepository.duplicatedId(userId);
       
        if(duplicatedIdData){ throw new Error ('중복된 아이디 입니다.')}; //예외처리. 중복

        return {message : "사용가능한 아이디 입니다"}
    };


    duplicatedNickname = async(nickname)=> {
        if(!nickname){ throw new Error ("닉네임을 입력하세요")}; //예외처리. 공란

        const duplicatedNicknameData = await this.userRepository.duplicatedNickname(nickname);
        
        if(duplicatedNicknameData){ throw new Error ('중복된 닉네임 입니다.')};  //예외처리. 공란
        
        return {message : "사용가능한 닉네임 입니다"}
    };


    login = async(authorization, userId, password)=> {
        const status = await this.excptLogin(authorization); 
        
        if(status){ throw new Error('이미 로그인 되어 있습니다.')};  //예외처리. 이미 로그인 된 상태
        if(!userId || !password){ throw new Error('아이디와 비밀번호를 모두 입력하세요.')};  //예외처리. 공란

        const loginData = await this.userRepository.login(userId, password);
        
        if (!loginData){ throw new Error ('일치하는 회원정보가 없습니다. ')}; //예외처리. 일치 정보 없음

        const token = jwt.sign({ userId: loginData.userId, nickname: loginData.nickname }, process.env.SECRET_KEY);
        
        return {token:`Bearer ${ token }`, userId: loginData.userId, nickname: loginData.nickname, message: '로그인 성공'};  //토큰 발행
    };


    getUserPage = async(userId) => {
        const user = await this.userRepository.getUserById(userId)
            
        if(!user) {throw new Error ('존재하지 않는 사용자입니다.')}  //예외처리. 불일치

        const nickname = user.nickname
        const getUserPageData = await this.userRepository.getUserPage(nickname);

        const posts = getUserPageData.posts;
        const postSort = posts.sort((a,b) => {  //게시글 내림차순 정렬
            if(a.postId > b.postId) return -1;
            if(a.postId < b.postId) return 1;
            return 0;
            });

        return {userInfo: user, posts: postSort};        
    };


    updateUser = async(userId, nickname, statusText)=> {
        const user = await this.userRepository.getUserById(userId)
        
        if(!user) {throw new Error ('존재하지 않는 사용자입니다.')} //예외처리. 불일치

        if(!nickname || !statusText){throw new Error ("수정할 내용을 입력하세요")};  //예외처리. 공란
        
        const updateUserData = await this.userRepository.updateUser(userId, nickname, statusText);

        return updateUserData;

    };
}

module.exports = UserService;