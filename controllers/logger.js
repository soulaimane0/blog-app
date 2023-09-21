import { createLogger, transports, format } from 'winston';

const customFormat = format.combine(
  format.timestamp(),
  format.printf((info) => {
    return `${info.timestamp} - [${info.level.toUpperCase().padEnd(7)}] : ${
      info.message
    }`;
  })
);

const logger = createLogger({
  format: customFormat,
  transports: [
    new transports.Console({ level: 'silly' }),
    new transports.File({ filename: 'logs/app.log', level: 'info' }),
  ],
});

export default logger;
