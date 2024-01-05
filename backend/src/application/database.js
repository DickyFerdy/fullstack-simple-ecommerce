import { PrismaClient } from "@prisma/client";
import { logger } from "./logging.js";

const getCurrentTimestamp = () => {
  const currentDateTime = new Date();
  return currentDateTime.toISOString();
}

export const prismaClient = new PrismaClient({
  log: [
    {
      emit: 'event',
      level: 'query'
    },
    {
      emit: 'event',
      level: 'error'
    },
    {
      emit: 'event',
      level: 'info'
    },
    {
      emit: 'event',
      level: 'warn'
    }
  ]
});

prismaClient.$on('error', (error) => {
  logger.error(`[${getCurrentTimestamp()}] Error occurred: ${error.message}`);
});

prismaClient.$on('warn', (warning) => {
  logger.warn(`[${getCurrentTimestamp()}] Warning: ${warning.message}`);
});

prismaClient.$on('info', (info) => {
  logger.info(`[${getCurrentTimestamp()}] Info: ${info.message}`);
});

prismaClient.$on('query', (queryEvent) => {
  logger.debug(`[${getCurrentTimestamp()}] Query: ${queryEvent.query}`);
});