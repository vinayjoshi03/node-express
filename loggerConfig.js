const winston = require('winston');
const {format} = require('winston');
const Colors = {
    info: "\x1b[36m",
    error: "\x1b[31m",
    warn: "\x1b[33m",
    verbose: "\x1b[43m",
};
//winston.add(winston.transports.Console, {'timestamp':true});
const logConfiguration = {
    format: format.combine(
        format.timestamp({
          format: 'YYYY-MM-DD HH:mm:ss'
        }),
        format.printf(info => `${info.timestamp} ${info.level}: ${info.message}`+(info.splat!==undefined?`${info.splat}`:" "))
      ),
    'transports': [
        new winston.transports.Console(),
    ],
};
const logger = winston.createLogger(module.exports.logConfiguration);



module.exports = {
    logConfiguration,
    logger
}