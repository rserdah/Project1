const { createLogger, transports, format } = require("winston");

const logger = createLogger({
  level: "info", // log only messages with level 'info' and above
  format: format.combine(
    format.timestamp(),
    format.printf(({ timestamp, level, message }) => {
      return `${timestamp} [${level}]: ${message}`;
    })
  ),
  transports: [
    new transports.Console(),
    new transports.File({ filename: "error.log", level: "error" }), // log only errors to this log file
    new transports.File({ filename: "app.log" }), // log to a file
  ],
});

process.on("uncaughtException", (error) => {
  let location = '';
  try { let ln = error.stack.split('at ')[1]; location = ln.slice(ln.lastIndexOf('\\') + 1); } catch (err) { }
  logger.error(`Uncaught Exception: ${location} ${error}`);
  process.exit(1);
});

module.exports = logger;