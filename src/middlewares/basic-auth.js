'use strict';

const base64 = require('base-64');
const {User} = require('../models/index');

module.exports = async (req, res, next) => {
    if (!req.headers.authorization) {
        next('Invalid login');
    }
    // basic ajkldsfhlkdsjfds
    const encodedCredintials = req.headers.authorization.split(' ').pop();
    //email:password
    const [email, password] = base64.decode(encodedCredintials).split(':');
   
    
    User.authenticateBasic(email, password)
        .then((user) => {
            req.user = user;
            if(user === "Invalid User"){
                next("error");
            }
            next();
        })
        .catch((err) => next(err.message));
}