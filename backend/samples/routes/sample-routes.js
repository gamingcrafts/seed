const Joi = require('joi');
const sampleService = require('../service/sample-service');

module.exports = function (server) {
  server.route({
    path: '/samples',
    method: 'GET',
    handler(req, h) {
      return "Working";
    },
    options: {
      description: 'Gets the list of Samples',
      tags: ['api']
    }
  });
}