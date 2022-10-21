const jwt = require('jsonwebtoken');
const { Users } = require('../models');

module.exports = (req, res, next) => {
    const { authorization } = req.headers;
    const [tokenType, tokenValue] = (authorization || '').split(' ');

    if (!tokenValue || tokenType !== 'Bearer') {
        res.status(401).send({
            errorMessage: '로그인 후 이용 가능한 기능입니다.',
        });
        return;
    }

    try {
        const { id } = jwt.verify(tokenValue, 'my-secret-key');
        Users.findByPk(id).then((user) => {
            res.locals.Users = user;
            next();
        });
    } catch (err) {
        res.status(401).send({
            errorMessage: '로그인 후 이용 가능한 기능입니다.',
        });
    }
};