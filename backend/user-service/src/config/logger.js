const pino = require('pino')
const pretty = require('pino-pretty')
const logger = pino(pretty({
  colorize: true
}))
logger.info("User-Service-Hygieia")

module.exports = logger