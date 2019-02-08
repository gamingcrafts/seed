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

  

  
}