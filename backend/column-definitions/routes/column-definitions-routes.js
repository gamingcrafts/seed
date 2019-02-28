const Joi = require('joi');
const customMappingService = require('../services/column-definitions-service');

module.exports = function (server) {
  server.route({
    path: '/coldef',
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
    path: '/coldef/{indexName}',
    method: 'GET',
    handler(req, h) {
      return customMappingService.getOneCustomMapping(req.params.indexName);
    },
    options: {
      description: 'Gets the customMapping for the index',
      tags: ['api']
    }
  });

  server.route({
    path: '/coldef/',
    method: 'POST',
    handler(req, h) {
      return customMappingService.index(req.payload);
    },
    options: {
      description: 'Create a Custom Mapping',
      tags: ['api'],
      validate: {
        payload: {
          indexName: Joi.string().required(),
          properties: Joi.object().required()
        },
        failAction: async (request, h, err) => {
          throw err;
        }
      }
    }
  });

  server.route({
    path: '/coldef/{id}',
    method: 'PUT',
    handler(req, h) {
      const {
        id,
        ...customMapping
      } = req.payload;
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
          mappingId: Joi.string().optional(),
          properties: Joi.object().required()
        }
      }
    }
  });
}