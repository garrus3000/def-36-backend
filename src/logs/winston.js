const winston = require("winston");



const logger = winston.createLogger({
    level: "info",
    transports: [
        new winston.transports.Console({
            level: "info",
            format: winston.format.combine(
                winston.format.colorize(),
                winston.format.simple()
            ),
        }),
    ],
});

const loggerWarn = winston.createLogger({
    level: "warn",
    transports: [
        new winston.transports.Console({
            level: "warn",
            format: winston.format.combine(
                winston.format.colorize(),
                winston.format.simple()
            ),
        }),
        new winston.transports.File({
            filename: "src/logs/winston_logs/warn.log",
            level: "warn",
        }),
    ],
});

const loggerError = winston.createLogger({
    level: "error",
    transports: [
        new winston.transports.Console({
            level: "error",
            format: winston.format.combine(
                winston.format.colorize(),
                winston.format.simple()
            ),
        }),
        new winston.transports.File({
            filename: "src/logs/winston_logs/error.log",
            level: "error",
        }),
    ],
});

module.exports = {logger, loggerWarn, loggerError};