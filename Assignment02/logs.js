const { createLogger, format, transports } = require('winston');

const log = format.printf(({ level, message, timestamp }) => {
    return JSON.stringify({
        timestamp: timestamp,
        severity: level.toUpperCase(),
        message: message,
    });
});

const webappLog = createLogger({
    level: 'debug',
    format: format.combine(
        format.timestamp(),
        log
    ),
    transports: [
        new transports.File({ filename: './webapp.log' }),
        // new transports.Console(),
    ],
});

module.exports = webappLog;
