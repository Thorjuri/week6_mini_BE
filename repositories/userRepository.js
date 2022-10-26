const { Users, Posts, Likes } = require("../models");
const router = require("../routes");
const { Op } = require("sequelize");


class UserRepository {

    // userId로 유저 조회
    getUserById = async(userId)=> {
        const user = await Users.findOne({ where : { userId } });
        return user;
    };
    
    // 아이디 중복확인
    duplicatedId = async(userId)=> {
        const existId = await Users.findOne({ where : { userId }});
        return existId
    };

    // 닉네임 중복확인
    duplicatedNickname = async(nickname)=> {
        const existNickname = await Users.findOne({ where : { nickname }});
        return existNickname;        
    };

    createUser = async(userId, nickname, password) =>{
        const result = await Users.create({ userId, nickname, password });
        return result;
    };

    createUserWithImg = async(userId, image, nickname, password) =>{
        const result = await Users.create({ userId, image, nickname, password });
        return result;
    };

    login = async(userId, password)=> {     
        const user = await Users.findOne({ where: { userId, password } });
        return user;
    };

    getUserPage = async(nickname)=> {
        const posts = await Posts.findAll({ where : { nickname }});
        return {posts: posts};
    };
    
    // 유저 프로필 수정
    updateUser = async(userId, nickname, statusText)=> {
        await Users.update({ nickname, statusText },{ where: { userId } });  // nickname 중복확인은 '/checkname' api 이용
        return {message : "프로필 업데이트 성공"};
    };
};  
  


module.exports = UserRepository;