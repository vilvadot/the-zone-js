import { DEBUG_ENABLED } from "../config.js";

export class Debug {
  static log(value) {
    const style = 'color: DarkTurquoise'
    if (!DEBUG_ENABLED) return;
    console.log(`%c${value}`, style);
  }

  static timeStart(value) {
    if (!DEBUG_ENABLED) return;
    console.time(value);
  }

  static timeEnd(value) {
    if (!DEBUG_ENABLED) return;
    console.timeEnd(value);
  }
}