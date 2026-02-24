const winston = require('winston');
const { combine, timestamp, json } = winston.format;

const timezoned = () => new Date().toLocaleString('es-AR', {
  timeZone: 'America/Argentina/Buenos_Aires',
});

const logger = winston.createLogger({
  level: 'info',
  format: combine(
    timestamp({format: timezoned}),
    json()
  ),
  // defaultMeta: { service: 'user-service' },
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' }),
  ],
});

logger.add(
  new winston.transports.Console({
    format: winston.format.simple(),
  }),
);

module.exports = function buildLogger(service) {
  return {
    log: (message) => {
      logger.log('info', { message, service });
    },
    error: (message) => {
      logger.error('error', { 
        message, 
        service,
      });
    }
  };
};
