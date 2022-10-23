const jwt = require('jsonwebtoken');
const { Users } = require('../models');

// module.exports = (req, res, next) => {
//     const { authorization } = req.headers;
//     const [tokenType, tokenValue] = (authorization || '').split(' ');

//     if (!tokenValue || tokenType !== 'Bearer') {
//         res.status(401).send({
//             errorMessage: '로그인 후 이용 가능한 기능입니다.',
//         });
//         return;
//     }

//     try {
//         const { userId } = jwt.verify(tokenValue, 'my-secret-key');
//         Users.findByPk(userId).then((user) => { // int인 id라면 findByPk 쌉가능. 하지만 str인 userId라면?????  
//             res.locals.user = user;
//             next();
//         });
//     } catch (err) {
//         res.status(401).send({
//             errorMessage: '로그인 후 이용 가능한 기능입니다.',
//         });
//     }
// };

module.exports = (req, res, next) => {
    const {authorization}  = req.headers;
    const [authType, authToken] = (authorization || "").split(" ");

    if (!authToken || authType !== "Bearer") {
      res.status(401).send({
        errorMessage: "로그인 후 이용 가능한 기능입니다.(1)",
      });
      return;
    }
  
    try {
      const { userId } = jwt.verify(authToken, "my-secret-key");
      Users.findOne({
        where: {userId:userId}
      }).then((user) => {
        res.locals.user = user;
        console.log("성공")
        next();
      });
    } catch (err) {
      res.status(401).send({
        errorMessage: "로그인 후 이용 가능한 기능입니다.(2)",
      });
    }
  };

