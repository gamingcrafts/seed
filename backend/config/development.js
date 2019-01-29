module.exports = {
  name: 'default',
  server: {
    host: 'localhost',
    port: 8000
  },
  elasticsearch: {
    host: "https://18f5c48dd62340748334f3bc4d373a0c.ap-southeast-1.aws.found.io:9243",
    log: "trace",
    keepAlive: true,
    minSockets: 5,
    maxSockets: 20,
    requestTimeout: 120000,
    httpAuth: 'elastic:i8GUm9s4Wph3o7GUOi4bf7GU'
  }
}