const winston = require('winston');

const log = winston.format.printf(({ level, message, timestamp }) => {
    return JSON.stringify({"timestamp" : timestamp,
              "Severity" : level.toUpperCase(),
              "Message" : message});
});

const webappLog = winston.createLogger({

    level:'debug',

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