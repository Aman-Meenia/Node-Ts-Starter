import winston from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';

const levels = {
  error: 0,
  warn: 1,
  info: 2,
  debug: 3
};
// Determine the appropriate log level based on environment
const level = () => {
  const env = process.env.NODE_ENV || 'development';
  const isDevelopment = env === 'development';
  return isDevelopment ? 'debug' : 'info';
};

// Define different colors for each level.
const colors = {
  error: 'red',
  warn: 'yellow',
  info: 'blue',
  debug: 'cyan'
};

// Add colors to winston
winston.addColors(colors);

// Custom format for console output (colored text, not JSON)
const consoleFormat = winston.format.combine(
  winston.format.timestamp({ format: 'DD MMM, YYYY - HH:mm:ss:SSS' }),
  winston.format.colorize({ all: true }),
  winston.format.printf(({ timestamp, level, message }) => {
    return `[${timestamp}] ${level} : ${message}`;
  })
);

// JSON format for file logs
const fileFormat = winston.format.combine(
  winston.format.timestamp({ format: 'DD MMM, YYYY - HH:mm:ss:SSS' }),
  winston.format.json()
);

// Create the logger instance
const logger = winston.createLogger({
  level: level(),
  levels,
  transports: [
    // Console transport with human-readable colored format
    new winston.transports.Console({
      format: consoleFormat
    }),
    // File transports with JSON format
    // new winston.transports.File({
    //   filename: 'logs/error.log',
    //   level: 'error',
    //   format: fileFormat
    // }),
    // new winston.transports.File({
    //   filename: 'logs/info.log',
    //   level: 'info',
    //   format: fileFormat
    // }),
    new DailyRotateFile({
      level: 'error',
      filename: './logs/error-%DATE%.log',
      datePattern: 'YYYY-MM-DD-HH',
      format: fileFormat,
      // zippedArchive: true,
      maxSize: '20m',
      maxFiles: '14d'
    }),
    new DailyRotateFile({
      level: 'info',
      filename: './logs/info-%DATE%.log',
      datePattern: 'YYYY-MM-DD-HH',
      format: fileFormat,
      // zippedArchive: true,
      maxSize: '20m',
      maxFiles: '14d'
    })
  ]
});

export default logger;
