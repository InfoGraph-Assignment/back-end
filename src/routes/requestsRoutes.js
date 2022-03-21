'use strict';

const express = require('express');
const requestsRouter = express.Router();

const { User , Request } = require('../models/index');
const bearerAuth = require('../middlewares/bearer-auth');
const permissions = require('../middlewares/acl');


requestsRouter.post('/newRequest', bearerAuth, permissions('create'), async (req, res, next) => {
    const requestInfo = req.body;
    try {
        const requestRecord = await Request.create(requestInfo);
        res.status(201).json(requestRecord);
    } catch (e) {
        next(e.message)
    }   
});

requestsRouter.get('/allRequests', bearerAuth, permissions('delete'), async (req, res, next) => {
    try {
        const requests = await Request.findAll({ 
            include : [{
                model : User,
                required: false
            }],
        });

        res.status(200).json(requests);
    } catch (e) {
        next(e.message);
    }
});


requestsRouter.post('/myRequests', bearerAuth, permissions('read'), async (req, res, next) => {
   const userId = req.body.userId;
   console.log(userId);
    try {
        const requests = await Request.findAll({
            where: {
                userId: userId
            }
        })

        res.status(200).json(requests);
    } catch (e) {
        next(e.message);
    }
})

requestsRouter.get('/getRequsetById/:id', bearerAuth, permissions('read'), async (req, res, next) => {
    const id = req.params.id;
    try {
        
        const request = await Request.findOne({
            where: {
                id: id
            },


        })
        res.status(200).json(request);
    } catch (e) {
        next(e.message);
    }
})


module.exports = requestsRouter;