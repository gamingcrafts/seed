module.exports = {
  name: 'development',
  server: {
    host: 'localhost',
    port: 8000
  },
  elasticsearch: {
    host: "",
    log: "trace",
    keepAlive: true,
    minSockets: 5,
    maxSockets: 20,
    requestTimeout: 120000,
    httpAuth: ''
  },
  indexes: {
    sample: 'sample__sample'
  }
}