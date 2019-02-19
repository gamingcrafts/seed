const Joi = require('joi');
const settingsService = require('../services/settings-service');

module.exports = function (server) {
  server.route({
    path: '/settings',
    method: 'GET',
    handler(req, h) {
      return settingsService.list();
    },
    options: {
      description: 'Gets the list of Settings',
      tags: ['api']
    }
  });

  server.route({
    path: '/settings/{id}',
    method: 'PUT',
    handler(req, h) {
      const { id, ...settings } = req.payload;
      return settingsService.index(settings, req.params.id);
    },
    options: {
      description: 'Update the Settings',
      tags: ['api'],
      validate: {
        params: {
          id: Joi.string().required()
        },
        payload: {
            properties:Joi.object().required()
          }
      }
    }
  });
}