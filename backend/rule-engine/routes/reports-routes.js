const Joi = require('joi');
const ruleEngineReportsService = require('../services/reports-service');

module.exports = function (server) {
    server.route({
        path: '/ruleengine/reports/',
        method: 'GET',
        handler(req, h) {
            return ruleEngineReportsService.list();
        },
        options: {
            description: 'Gets the Rule-Engine Reports',
            tags: ['api']
        }
    });

    server.route({
        path: '/ruleengine/reports/',
        method: 'POST',
        handler(req, h) {
            return ruleEngineReportsService.index(req.payload);
        },
        options: {
            description: 'Create a Rule-Engine Report',
            tags: ['api'],
            validate: {
                payload: Joi.object().required()
            }
        }
    });

    server.route({
        path: '/ruleengine/reports/{id}',
        method: 'PUT',
        handler(req, h) {
            let id  = req.params.id;
            return ruleEngineReportsService.index(req.payload,id);
        },
        options: {
            description: 'Update a Rule-Engine Report',
            tags: ['api'],
            validate: {
                payload: Joi.object().required()
            }
        }
    });

    server.route({
        path: '/ruleengine/reports/{id}',
        method: 'DELETE',
        handler(req, h) {
          return ruleEngineReportsService.del(req.params.id);
        },
        options: {
          description: 'Delete a Report',
          tags: ['api'],
          validate: {
            params: {
              id: Joi.string().required()
            }
          }
        }
      });
}