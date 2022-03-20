'use strict';

const { User } = require('../models/index');

module.exports = async (req, res, next) => {
    if (!req.headers.authorization) {
        next("Invalid Login ===> No Authorization Header");
    }
 

    let token = req.headers.authorization.split(' ').pop();

    try {
        let validUser = await User.authenticateToken(token);
        req.user = validUser;
        req.token = validUser.token;
        req.user = validUser; 
        next()
    }
    catch (e) {
        next(e.message);
    }

}