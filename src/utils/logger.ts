/* eslint-disable  @typescript-eslint/no-var-requires */
const { createLogger, format, transports } = require('winston');
const { getCurrentFormattedTimestamp } = require('./moment');

const { combine, json, prettyPrint, colorize, printf } = format;

/* eslint-disable no-unused-vars */
const printfCb: (obj: any) => string = ({ level, message, timestamp }) =>
    `${timestamp} ${level}: ${message}`;

const consoleFormat = printf(printfCb);

let logger;

function customJson(info: any) {
    return {
        ...info,
        timestamp: getCurrentFormattedTimestamp(),
    };
}

if (process.env.APP_ENV && process.env.APP_ENV === 'production') {
    logger = createLogger({
        level: 'info',
        transports: [
            new transports.Console({
                format: combine(format(customJson)(), json()),
            }),
        ],
    });
} else {
    logger = createLogger({
        level: 'debug',
        transports: [
            new transports.Console({
                format: combine(format(customJson)(), prettyPrint(), colorize(), consoleFormat),
            }),
        ],
    });
}

const LoggerUtils = {
    loggerInstance: logger,
};

export default LoggerUtils;
