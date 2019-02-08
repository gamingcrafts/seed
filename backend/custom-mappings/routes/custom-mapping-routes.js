const Joi = require('joi');
const customMappingService = require('../services/custom-mapping-service');

module.exports = function (server) {
  server.route({
    path: '/custommappings',
    method: 'GET',
    handler(req, h) {
      return customMappingService.list();
    },
    options: {
      description: 'Gets the list of CustomMappings',
      tags: ['api']
    }
  });

  server.route({
    path: '/custommappings',
    method: 'POST',
    handler(req, h) {
      return customMappingService.index(req.payload);
    },
    options: {
      description: 'Create a Sample',
      tags: ['api'],
      validate: {
        payload: {
          indexName: Joi.string().required(),
          properties:Joi.array().required()
        },
        failAction: async (request, h, err) => { throw err; }
      }
    }
  });

  server.route({
    path: '/custommappings/{id}',
    method: 'PUT',
    handler(req, h) {
      const { id, ...customMapping } = req.payload;
      return customMappingService.index(customMapping, req.params.id);
    },
    options: {
      description: 'Update a Custom Mapping',
      tags: ['api'],
      validate: {
        params: {
          id: Joi.string().required()
        },
        payload: {
            indexName: Joi.string().required(),
            properties:Joi.array().required()
          }
      }
    }
  });
}