const winston = require('winston');

const log = winston.format.printf(({ level, message, timestamp }) => {
    return `${timestamp} [${level.toUpperCase()}]: ${message}`;
});

const webappLog = winston.createLogger({

    format: winston.format.combine(

        winston.format.json(),
        winston.format.timestamp(),
        log

    ),

    transports: [
        new winston.transports.File({ filename: './webapp.log' }),
        new winston.transports.Console(),
    ],
});

module.exports = webappLog;