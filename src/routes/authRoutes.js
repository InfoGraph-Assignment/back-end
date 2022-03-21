'use strict';

const express = require('express');
const authRouter = express.Router();

const { User } = require('../models/index');
const basicauth = require('../middlewares/basic-auth');
const bearerAuth = require('../middlewares/bearer-auth');
const permissions = require('../middlewares/acl');


authRouter.post('/signup', async (req, res, next) => {
    const userInfo = req.body;
    const userName = req.body.firstName+" "+req.body.lastName;
    userInfo.userName = userName;

    console.log(userInfo);
    try {
        const userRecord = await User.create(userInfo);
        res.status(201).json(userRecord);
    } catch (e) {
        next(e.message)
    }
});

authRouter.post("/signin", basicauth, (req, res) => {

    let createdAt = new Date(req.user.createdAt).toLocaleDateString();
    createdAt = createdAt.split("/")[1] + " / " + createdAt.split("/")[0] + " / " + createdAt.split("/")[2]  

    const userData = {
        userName: req.user.userName,
        phone: req.user.phone,
        email: req.user.email,
        role: req.user.role,
        id: req.user.id,
        token: req.user.token,
        capabilities: req.user.capabilities,
        address : req.user.address,
        createdAt : createdAt,
        gender : req.user.gender,
        birthDate : req.user.birthDate
    }
    res.status(200).json(userData);
});



module.exports = authRouter;