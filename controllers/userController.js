const UserService = require('../services/userService')

class UserController {
    userService = new UserService();


    createUser = async(req, res, next) => {
        const { authorization } = req.headers;
        const { userId, nickname, password } = req.body;
        const fileData = req.file

        try{

            const createUserData = await this.userService.createUser(authorization, fileData, userId, nickname, password);
            
            res.status(201).send(createUserData);
            
        } catch(error) {

            res.status(400).json({error: error.message})
        }
    };

    duplicatedId = async(req, res, next)=> {
        const {userId} = req.body;
        try{
            const duplicatedIdData = await this.userService.duplicatedId(userId);
            res.status(200).send(duplicatedIdData);
        }catch(error){
            res.status(400).json({error: error.message})
        }
    };

    duplicatedNickname = async(req, res, next)=> {
        const {nickname} = req.body;
        try{
            const duplicatedNicknameData = await this.userService.duplicatedNickname(nickname);
            res.status(201).send(duplicatedNicknameData);
        }catch(error){
            res.status(400).json({error: error.message})
        };
    };

    login = async(req, res, next)=> {
        const { authorization } = req.headers;
        const { userId, password } = req.body;  
        try{
            const loginData = await this.userService.login(authorization, userId, password);
            res.header('Authorization',loginData.token)
            res.status(201).send(loginData.message)
        }catch(error){
            res.status(400).json({error: error.message})
        };
    };

    getUserPage = async(req, res, next)=> {
        const {userId} = req.params
        try{
            const getUserPageData = await this.userService.getUserPage(userId);
            res.status(201).send(getUserPageData);
        }catch(error){
            res.status(401).json({error: error.message});
        };
    };

    updateUser = async(req, res, next)=> {
        const {userId} = req.params
        const {nickname, statusText} = req.body;
        try{
            const updateUserData = await this.userService.updateUser(userId, nickname, statusText);
            res.status(201).send(updateUserData);
        }catch(error){
            res.status(401).json({error: error.message});
        };
    };
};

module.exports = UserController;