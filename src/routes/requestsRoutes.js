'use strict';

const express = require('express');
const requestsRouter = express.Router();

const { User, Request } = require('../models/index');
const bearerAuth = require('../middlewares/bearer-auth');
const permissions = require('../middlewares/acl');


requestsRouter.post('/newRequest', bearerAuth, permissions('create'), async (req, res, next) => {
    const requestInfo = req.body;
    console.log(requestInfo);
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
            include: [{
                model: User,
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

requestsRouter.get('/getRequsetById/:userId/:id', bearerAuth, permissions('read'), async (req, res, next) => {
    const id = req.params.id;
    const userId = req.params.userId;
    console.log(id);
    console.log(userId);
    try {
        const request = await Request.findOne({
            where: {
                id: id,
                userId: userId
            },
        })
        if (request) {
            let currentdate = new Date(request.createdAt);
            let datetime = (currentdate.toDateString()).split(' ')[0] + "  " + currentdate.getDate() + "/" + (currentdate.toLocaleDateString()).split('/')[0] + "/" + currentdate.getFullYear() + "  "
                + currentdate.toLocaleTimeString();
            request.dataValues.time = datetime;
        }

        res.status(200).json(request);
    } catch (e) {
        next(e.message);
    }
})

requestsRouter.put("/updateRequsest/:id", async (req, res, next) => {
    const id = req.params.id;
    const data = req.body;
    console.log(id);
    console.log(data);
    try {
        await Request.update(data, {
            where: {
                id: id
            }
        });

        //    let dataResponse =  await Request.findOne({
        //         where :{
        //             id : id
        //         }
        //     })
        //     console.log(dataResponse);
        res.status(200).json("updated");

    } catch (e) {
        next(e.message)
    }
})

requestsRouter.get("/allRequests", bearerAuth, permissions("delete"), async (req, res, next) => {
    try {
        const requests = await Request.findAll({
            include: [{
                model: User,
                required: false
            }],
        });

        res.status(200).json(requests);
    } catch (e) {
        next(e.message)
    }
})

requestsRouter.get("/requestByStatus/:status", bearerAuth, permissions("delete"), async (req, res, next) => {
    const status = req.params.status;

    try {
        const requests = await Request.findAll({
            where: {
                status: status
            },
            include: [{
                model: User,
                required: false
            }],
        })

        res.status(200).json(requests);
    } catch (e) {
        next(e.message)
    }
})

requestsRouter.put("/updatestatus/:status/:id", bearerAuth, permissions('delete'), async (req, res, next) => {
    const status = req.params.status;
    const id = req.params.id;

    try {
        await Request.update({
            status: status
        }, {
            where: {
                id: id
            }
        })
        res.status(200).json("updated");
    } catch (e) {
        next(e.message)
    }

})

module.exports = requestsRouter;