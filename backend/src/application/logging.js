import winston from "winston";

export const logger = winston.createLogger({
  level: "info",
  format: winston.format.json(),
  transports: [
    new winston.transports.Console({})
  ],
  level: "warn",
  format: winston.format.json(),
  transports: [
    new winston.transports.Console({})
  ],
  level: "error",
  format: winston.format.json(),
  transports: [
    new winston.transports.Console({})
  ],
  level: "debug",
  format: winston.format.json(),
  transports: [
    new winston.transports.Console({})
  ],
});