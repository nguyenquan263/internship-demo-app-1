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
    }
}
