const config = require('./config');
const Hapi = require('hapi');
const Inert = require('inert');
const Vision = require('vision');
const HapiSwagger = require('hapi-swagger');
const Pack = require('./package');
const server = Hapi.server(config.server);
const prerun = require('./prerun');
const _ = require('lodash');

const sampleRoute = require('./samples/routes/sample-routes');
const columnDefinitionRoute = require('./column-definitions/routes/column-definitions-routes');
const indicesRoute = require('./indices/routes/indices-routes');
const ruleEngineSettingsRoute = require('./rule-engine/routes/settings-routes');
const ruleEngineOperatorsRoute = require('./rule-engine/routes/operators-routes');
const ruleEngineFieldsRoute = require('./rule-engine/routes/fields-routes');

const routesArray = [sampleRoute, columnDefinitionRoute, indicesRoute, ruleEngineSettingsRoute, ruleEngineOperatorsRoute,ruleEngineFieldsRoute];

_.invokeMap(routesArray, _.call, null, server);

const init = async () => {

prerun.run();

  const swaggerOptions = {
    info: {
      title: 'API Documentation',
      version: Pack.version,
    },
  };

  await server.register([
    Inert,
    Vision,
    {
      plugin: HapiSwagger,
      options: swaggerOptions
    }
  ]);

  await server.start();
};

process.on('unhandledRejection', (err) => {
  console.log(err);
  process.exit(1);
});

init();