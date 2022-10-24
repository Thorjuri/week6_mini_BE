const UserRepository = require('../repositories/userRepository');
const jwt = require("jsonwebtoken");


class UserService {

    userRepository = new UserRepository();

    excptLogin = async(authorization)=> {
        // const { authorization } = req.headers;
        const [authToken] = (authorization || "").split(" ");
        if(authToken){
            return {message : '이미 로그인 되어 있습니다.'};
        };
      };

    createUser = async(authorization, userId, nickname, password) => {
        const excptLoginResult = await this.excptLogin(authorization); //예외처리1. 이미 로그인 된 상태
        if (excptLoginResult) { return excptLoginResult };
        const createUserData = await this.userRepository.createUser(userId, nickname, password);

        return createUserData;
    };


    login = async(authorization, userId, password)=> {
        const excptLoginResult = await this.excptLogin(authorization); //예외처리1. 이미 로그인 된 상태
        if (excptLoginResult) { return excptLoginResult };

        if(!userId || !password){  //예외처리2. 아이디 혹 비밀번호 공란
            return { message : '아이디와 비밀번호를 모두 입력하세요.'};
        };

        const loginData = await this.userRepository.login(userId, password);

         
        try {
            if (!loginData){
                throw new Error ('일치하는 회원정보가 없습니다. 아이디 및 비밀번호를 확인해주세요') //예외처리3. 일치 정보 없음
            }

            const token = jwt.sign({ userId: loginData.userId }, "access-secret-key");
            return {token:token, message: '로그인 성공'};
        }catch (error) {
            return {message: `로그인 실패: ${error.message}`}  //예외처리4. DB 접근 혹은 jwt 발행 실패 
        }
    };


    getUser = async(userId) => {
        const getUserData = await this.userRepository.getUser(userId);
        const posts = getUserData.posts; 

        const postSort = posts.sort((a,b) => {
            if(a.postId > b.postId) return -1;
            if(a.postId < b.postId) return 1;
            return 0;
        });

        return {userInfo: getUserData.userInfo, posts: postSort};
    };
};

module.exports = UserService;