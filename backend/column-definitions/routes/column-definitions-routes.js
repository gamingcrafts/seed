const Joi = require('joi');
const colDefService = require('../services/column-definitions-service');

module.exports = function (server) {
  server.route({
    path: '/coldef',
    method: 'GET',
    handler(req, h) {
      return colDefService.list();
    },
    options: {
      description: 'Gets the list of Column Definitions',
      tags: ['api']
    }
  });

  server.route({
    path: '/coldef/{indexName}',
    method: 'GET',
    handler(req, h) {
      return colDefService.getOneCustomMapping(req.params.indexName);
    },
    options: {
      description: 'Gets the customMapping for the index',
      tags: ['api'],
      validate: {
        params: {
          indexName: Joi.string().required()
        }
      }
    }
  });

  server.route({
    path: '/coldef/',
    method: 'POST',
    handler(req, h) {
      return colDefService.index(req.payload, `column-definition-${req.payload.index}`);
    },
    options: {
      description: 'Create a Custom Mapping',
      tags: ['api'],
      validate: {
        payload: {
          index: Joi.string().required(),
          columns: Joi.object().required()
        },
        failAction: async (request, h, err) => {
          throw err;
        }
      }
    }
  });
}