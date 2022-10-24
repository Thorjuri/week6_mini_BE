const UserService = require('../services/userService')

class UserController {
    userService = new UserService();

    

    createUser = async(req, res, next)=> {
        const { authorization } = req.headers;
        const {userId, nickname, password} = req.body;
        const createUserData = await this.userService.createUser(authorization, userId, nickname, password);
        
        res.status(201).send(createUserData);
    };

    login = async(req, res, next)=> {
        const { authorization } = req.headers;
        const { userId, password } = req.body;  
        const loginData = await this.userService.login(authorization, userId, password);
        // res.cookie(loginData.token)s
        res.cookie('Authorization',loginData.token)
        res.send(loginData.message)
    };


    getUser = async(req, res, next)=> {
        const {userId} = req.params
        const getUserData = await this.userService.getUser(userId);
        res.status(201).send(getUserData);
    };
};

module.exports = UserController;