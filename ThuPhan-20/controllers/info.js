var models = require('../models');
var Response = require('../utils/response');
var JWT = require('../utils/jwt');

module.exports = {
    retrieveAll: async function(req, res) {
        await models.Info.findAll({
            order: [
                ['id', 'DESC']
            ]
        })
        .then(function(infos) {
            res.send(Response.successResponse("This is info list.", infos));
        })
        .catch(function(err) {
            res.send(Response.unknowErrorResponse("Internal Error", err));
        });

    },
    create: async function(req, res) {
        await models.Info.create({
            fullname: req.body.fullname,
            address: req.body.address,
            state: req.body.state,
            zip: req.body.zip,
            email: req.body.email,
            phone: req.body.phone,
            created_at: new Date()
        }).then(function(result) {
            res.send(Response.successResponse("Adding an Info successfully!", result));
        }).catch(function(err) {
            res.send(Response.unknowErrorResponse("Internal error.", err));
        });
    },
    retrieveOne: async function(req, res) {
        var targetID = req.params.id;

        await models.Info.findOne({
            where: {
                id: targetID
            }
        })
        .then(function(info) {
            if (info) {
                res.send(Response.successResponse(`This is the info with ID equal ${targetID}`, info));
            } else
                res.send(Response.notFoundResponse("Not found the target info", null));
        })
        .catch(function(err) {
            res.send(Response.unknowErrorResponse("Internal error", err));
        });
    },
    delete: async function(req, res) {
        var targetID = req.params.id;
        await models.Info.destroy({
            where: {
                id: targetID
            }
        })
        .then(function(result) {
            if (result === 0) {
                res.send(Response.notFoundResponse(`Cannot find the Info with ID equal ${targetID}.`, null));
            } else {
                res.send(Response.successResponse(`Deleting the Info with ID equal ${targetID} successfully.`, null));
            }
        })
        .catch(function(err) {
            res.send(Response.unknowErrorResponse("Internal error.", err));
        });
    },
    update: async function(req, res) {
        var targetID = req.params.id;

        await models.Info.update({
            fullname: req.body.fullname,
            address: req.body.address,
            state: req.body.state,
            zip: req.body.zip,
            email: req.body.email,
            phone: req.body.phone,
            created_at: new Date()
        }, {
            where: {
                id: targetID
            }
        }).then(async function(result) {

            await models.Info.findOne({
                where: {
                    id: targetID
                }
            })
            .then(function(info) {
                if (info)
                    res.send(Response.successResponse(`Updating info with ID equal ${targetID} successfully!`, info));
                else
                    res.send(Response.notFoundResponse("Not found the target info", null));
            })
            .catch(function(err) {
                res.send(Response.unknowErrorResponse("Internal Error", err));
            });

        }).catch(function(err) {
            res.send(Response.unknowErrorResponse("Internal error.", err));
        });
    },
}
