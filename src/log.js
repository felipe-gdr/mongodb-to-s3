const { createLogger, format, transports } = require('winston');
require('winston-daily-rotate-file');

const fileTransport = new transports.DailyRotateFile({
    filename: 'logs/mongodb-to-s3-%DATE%.log',
    datePattern: 'YYYY-MM-DD-HH',
    zippedArchive: true,
    maxSize: '20m',
    maxFiles: '30d'
});

const logger = createLogger({
    format: format.combine(format.timestamp(), format.json()),
    transports: [fileTransport, new transports.Console()]
});

module.exports = logger;
