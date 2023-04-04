import { EVENTS } from "../actions.js";
import { Bus } from "./bus.js";

export class Logger {
  bus: Bus;

  constructor(bus) {
    this.bus = bus;
  }

  log(message, color = "white") {
    this.bus.emit(EVENTS.LOG_EMITTED, { level: "log", message, color });
  }
}
