'use strict';

module.exports = (capability) => {
    return (req, res, next) => {
        if(req.user.capabilities.indexOf(capability) > -1) {
            next();
        }
        else {
            res.status(403).send('Forbidden');
        }
    };
}