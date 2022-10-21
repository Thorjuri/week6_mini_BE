const { Users, Posts, Likes } = require("../models");
const router = require("../routes");
const { Op } = require("sequelize");


class UserRepository {

    createUser = async(userId, nickname, password) =>{
        const existUsers = await Users.findOne({
            where: { [Op.or]: [{ nickname }, { userId }]},
        });

        if(existUsers){
            if(existUsers.userId === userId){
                return {message : '중복된 아이디입니다.'}  //예외처리2. 아이디 또는 닉네임 중복
            }else {
                return {message : '중복된 닉네임입니다.'}
            };
        };      

        try {
            await Users.create({ userId, nickname, password });
            return {message: '회원가입 성공'}
        } catch(error){
            return {message: `회원가입 실패: ${error.message}`}
        }
    };


    login = async(userId, password)=> {     
        const user = await Users.findOne({ where: { userId, password } });
        
        // try {
        //     if (!user){
        //         throw new Error ('일치하는 회원정보가 없습니다. 아이디 및 비밀번호를 확인해주세요')
        //     }
        //     const token = jwt.sign({ userId: user.userId }, "access-secret-key");
        //     return {token:token, message: '로그인 성공'};
        // } catch (error) {
        //     return {message: `로그인 실패: ${error.message}`}
        // }
        return user;
    };


    getUser = async(userId)=> {
        const userInfo = await Users.findOne({ where : { userId }}) 
        const nickname = userInfo.nickname
        const posts = await Posts.findAll({ where : { nickname }})
        return {userInfo: userInfo, posts: posts}


        // const likes = await Likes.findAll({ 
        //     where: { nickname, like : 1 }
        // });
        // const userInfo = await Users.findOne({ where : { id }}) 
        // let post;
        // let likePosts = []
        // for(let like of likes){
        //     post = await Posts.findAll({
        //         where: { postId : like.postId }
        //     });
        //     likePosts.push(post[0]) 
        // };
        // return {data : likePosts, user: userInfo};
    };
};  
  


module.exports = UserRepository;