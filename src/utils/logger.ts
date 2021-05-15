/* eslint-disable  @typescript-eslint/no-var-requires */
const { createLogger, format, transports } = require('winston');

const { combine, json, prettyPrint, colorize, printf } = format;

/* eslint-disable no-unused-vars */
const printfCb: (obj: any) => string = ({ level, message, timestamp }) =>
    `${timestamp} ${level}: ${message}`;

const consoleFormat = printf(printfCb);

let logger;

// function stackDriverJsonFormat(info: any) {
//     const log = {
//         severity: info.level,
//         message: info.message,
//     };
//     if (info.level === 'error' && info.stack) {
//         log.message = `{ message: ${info.message}, stack: ${info.stack} }`;
//     }
//     return log;
// }

if (process.env.APP_ENV && process.env.APP_ENV !== 'dev') {
    logger = createLogger({
        level: 'debug',
        transports: [
            new transports.Console({
                // format: combine(format(stackDriverJsonFormat)(), json()),
                format: combine(json()),
            }),
        ],
    });
} else {
    logger = createLogger({
        level: 'debug',
        transports: [
            new transports.Console({
                format: combine(format.timestamp(), prettyPrint(), colorize(), consoleFormat),
            }),
        ],
    });
}

const LoggerUtils = {
    loggerInstance: logger,
};

export default LoggerUtils;
