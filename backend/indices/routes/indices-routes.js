const Joi = require('joi');
const indicesService = require('../services/indices-service');

module.exports = function (server) {
  server.route({
    path: '/alias',
    method: 'GET',
    handler(req, h) {
      return indicesService.getAliases();
    },
    options: {
      description: 'Gets the list of Alias in the DB',
      tags: ['api']
    }
  });

  server.route({
    path: '/alias/{indexName}',
    method: 'GET',
    handler(req, h) {
      return indicesService.getMapping(req.params.indexName);
    },
    options: {
      description: 'Gets the Mappings of the index in the DB',
      tags: ['api'],
      validate: {
        params: {
          indexName: Joi.string().required()
        }
      }
    }
  });
}