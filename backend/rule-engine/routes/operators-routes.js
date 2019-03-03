const Joi = require('joi');
const ruleEngineOperatorsService = require('../services/operators-service');

module.exports = function (server) {
    server.route({
        path: '/ruleengine/operators/',
        method: 'GET',
        handler(req, h) {
            return ruleEngineOperatorsService.list();
        },
        options: {
            description: 'Gets the Rule-Engine Operators',
            tags: ['api']
        }
    });

    server.route({
        path: '/ruleengine/operators/',
        method: 'PUT',
        handler(req, h) {
            return ruleEngineOperatorsService.index(req.payload);
        },
        options: {
            description: 'Update the Rule-Engine Operators',
            tags: ['api'],
            validate: {
                payload: Joi.object().required()
            }
        }
    });
}