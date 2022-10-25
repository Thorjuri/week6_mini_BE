const UserService = require('../services/userService')

class UserController {
    userService = new UserService();


    createUser = async(req, res, next)=> {
        const { authorization } = req.headers;
        const {userId, nickname, password} = req.body;
        const createUserData = await this.userService.createUser(authorization, userId, nickname, password);
        res.status(201).send(createUserData);
    };

    duplicatedId = async(req, res, next)=> {
        const {userId} = req.body;
        const duplicatedIdData = await this.userService.duplicatedId(userId);
        res.status(201).send(duplicatedIdData);
    };

    duplicatedNickname = async(req, res, next)=> {
        const {nickname} = req.body;
        const duplicatedNicknameData = await this.userService.duplicatedNickname(nickname);
        res.status(201).send(duplicatedNicknameData);
    };

    login = async(req, res, next)=> {
        const { authorization } = req.headers;
        const { userId, password } = req.body;  
        const loginData = await this.userService.login(authorization, userId, password);
        res.header('Authorization',loginData.token)
        res.status(201).send(loginData.message)
    };

    getUserPage = async(req, res, next)=> {
        const {userId} = req.params
        const getUserPageData = await this.userService.getUserPage(userId);
        res.status(201).send(getUserPageData);
    };

    updateUser = async(req, res, next)=> {
        const {userId} = req.params
        const {nickname, statusText} = req.body;
        const updateUserData = await this.userService.updateUser(userId, nickname, statusText);
        res.status(201).send(updateUserData);
    };
};

module.exports = UserController;