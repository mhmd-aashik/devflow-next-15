import pino from "pino";

const isEdge = process.env.NEXT_RUNTIME === "edge";
const isProduction = process.env.NODE_ENV === "production";

const logger = pino({
  level: process.env.LOG_LEVEL || "info",
  ...(isEdge || !isProduction
    ? {
        transport: {
          target: "pino-pretty",
          options: {
            colorize: true,
            ignore: "pid,hostname",
            translateTime: "SYS:standard",
          },
        },
      }
    : {}),
  formatters: {
    level: (label) => ({ level: label.toUpperCase() }),
  },
  timestamp: pino.stdTimeFunctions.isoTime,
});

export default logger;
