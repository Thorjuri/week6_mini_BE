const jwt = require("jsonwebtoken");
const { Users } = require("../models");

module.exports = (req, res, next) => {
    const {authorization}  = req.headers;
    const [authType, authToken] = (authorization || "").split(" ");

    if (!authToken || authType !== "Bearer") {
      res.status(401).send({
        errorMessage: "11로그인 후 이용 가능한 기능입니다.",
      });
      return ;   
    }
  
    try {
      const { userId } = jwt.verify(authToken, "access-secret-key");
      //mongoose에서sequelize 로 바꿨을때 변경된부분. pk 기본키 사용
      Users.findAll({
        where: {userId:userId}
      }).then((user) => {
        res.locals.user = user;
        console.log("성공")
        next();
      });
    } catch (err) {
      res.status(401).send({
        errorMessage: "22로그인 후 이용 가능한 기능입니다.",
      });
    }
  };
