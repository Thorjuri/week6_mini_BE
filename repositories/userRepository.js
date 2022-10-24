const { Users, Posts, Likes } = require("../models");
const router = require("../routes");
const { Op } = require("sequelize");


class UserRepository {
    
    // 아이디 중복확인
    duplicatedId = async(userId)=> {
        const existId = await Users.findOne({ where : { userId }});
        if(existId){
            return {message :'중복된 아이디입니다.'};  
        };
        return {message : "사용가능한 아이디 입니다"}
    };

    // 닉네임 중복확인
    duplicatedNickname = async(nickname)=> {
        const existNickname = await Users.findOne({ where : { nickname }});
        if(existNickname){
            return {message :'중복된 닉네임입니다.'};  
        };
        return {message : "사용가능한 닉네임 입니다"}
    };

    createUser = async(userId, nickname, password) =>{
        try {
            await Users.create({ userId, nickname, password });
            return {message: '회원가입 성공'};
        } catch(error){
            throw new Error ( `회원가입 실패: ${error.message}`)
        };
    };


    login = async(userId, password)=> {     
        const user = await Users.findOne({ where: { userId, password } });
        return user;
    };


    getUser = async(userId)=> {
        const userInfo = await Users.findOne({ where : { userId }}); 
        const nickname = userInfo.nickname;
        const posts = await Posts.findAll({ where : { nickname }});
        return {userInfo: userInfo, posts: posts}
    };

    updateUser = async(userId, nickname, statusText)=> {
        await Users.update({ nickname, statusText },{ where: { userId } });  // nickname 중복확인은 '/checkname' api 이용
        return {message : "프로필 업데이트 성공"};
    };
};  
  


module.exports = UserRepository;