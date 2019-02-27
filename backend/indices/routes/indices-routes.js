const Joi = require('joi');
const indicesService = require('../services/indices-service');

module.exports = function (server) {
  server.route({
    path: '/indices',
    method: 'GET',
    handler(req, h) {
      return indicesService.getAllindices();
    },
    options: {
      description: 'Gets the list of Indices in the DB',
      tags: ['api']
    }
  });

  server.route({
    path: '/indices/{indexName}',
    method: 'GET',
    handler(req, h) {
      return indicesService.getMapping(req.params.indexName);
    },
    options: {
      description: 'Gets the details of the index in the DB',
      tags: ['api'],
      validate: {
        params: {
          indexName: Joi.string().required()
        }
      }
    }
  });
}