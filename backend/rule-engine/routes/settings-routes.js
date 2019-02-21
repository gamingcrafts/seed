const Joi = require('joi');
const settingsService = require('../services/settings-service');

module.exports = function (server) {
  server.route({
    path: '/ruleengine/settings/',
    method: 'GET',
    handler(req, h) {
      return settingsService.list();
    },
    options: {
      description: 'Gets the Rule-Engine Settings',
      tags: ['api']
    }
  });

  server.route({
    path: '/ruleengine/settings/',
    method: 'PUT',
    handler(req, h) {
      
      return settingsService.index(req.payload);
    },
    options: {
      description: 'Update the Rule-Engine Settings',
      tags: ['api'],
      validate: {
        
        payload: Joi.object().required()
          
      }
    }
  });
}