const Joi = require('joi');
const ruleEngineFieldsService = require('../services/fields-service');

module.exports = function (server) {
    server.route({
        path: '/ruleengine/fields/',
        method: 'GET',
        handler(req, h) {
            return ruleEngineFieldsService.list();
        },
        options: {
            description: 'Gets the Rule-Engine Fields',
            tags: ['api']
        }
    });

    server.route({
        path: '/ruleengine/fields/',
        method: 'PUT',
        handler(req, h) {
            return ruleEngineFieldsService.index(req.payload);
        },
        options: {
            description: 'Update the Rule-Engine Fields',
            tags: ['api'],
            validate: {
                payload: Joi.object().required()
            }
        }
    });
}