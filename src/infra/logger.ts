import { EVENTS } from "../actions.js";
import { capitalize } from "../util/index.js";
import { Bus } from "./bus.js";

export class Logger {
  bus: Bus;

  constructor(bus) {
    this.bus = bus;
  }

  log(message, color = LOG_LEVEL.info) {
    this.bus.emit(EVENTS.LOG_EMITTED, {
      level: "log",
      message: capitalize(message),
      color,
    });
  }
}

export const LOG_LEVEL = {
  danger: "red",
  warning: "yellow",
  info: "white",
  explanation: "DarkOrchid",
};
