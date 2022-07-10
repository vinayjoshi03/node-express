const winston = require('winston');
const Colors = {
    info: "\x1b[36m",
    error: "\x1b[31m",
    warn: "\x1b[33m",
    verbose: "\x1b[43m",
};
const logConfiguration = {
    format: winston.format.json(),
    'transports': [
        new winston.transports.Console()
    ],
    format: winston.format.combine(
        winston.format.label({
            label: `Label🏷️`
        }),
        winston.format.timestamp({
            format: 'YYYY-MM-DD HH:mm:ss',
            
        }),
        winston.format.colorize(),
        //winston.format.printf(info => `${info.level}: ${info.label}: ${[info.timestamp]}: ${info.message}`),
    )
};
const logger = winston.createLogger(module.exports.logConfiguration);



module.exports = {
    logConfiguration,
    logger
}