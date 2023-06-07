import type { LoggerDriver } from "@sparrow/core";
import { Logger } from "@sparrow/core";

export class ConsoleDriver implements LoggerDriver {
  debug(message: string) {
    process.stdout.write(message);
  }
  info(message: string) {
    process.stdout.write(message);
  }
  error(message: string) {
    process.stderr.write(message);
  }
  warn(message: string) {
    process.stdout.write(message);
  }
}

export const cliLogger = Logger.getInstance();
