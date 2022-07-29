import type winston from "winston";
import { createLogger, format, transports } from "winston";

const { simple, combine, timestamp, prettyPrint, json } = format;

class Logger {
  private readonly logger: winston.Logger;

  constructor() {
    this.logger = this.createLogger();
  }

  public info(m: string) {
    this.logger.info(m);
  }

  public error(m: string) {
    this.logger.error(m);
  }

  private createLogger(): winston.Logger {
    const f = combine(
      process.env.NODE_ENV ? simple() : json(),
      timestamp(),
      prettyPrint({ colorize: true })
    );

    return createLogger({
      format: f,
      transports: [new transports.Console()],
      rejectionHandlers: [new transports.Console()],
    });
  }
}

export default new Logger();
