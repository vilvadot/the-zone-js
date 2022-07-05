import { EVENTS } from "./events.js";

export class Logger {
    constructor(bus){
        this.bus = bus;
    }

    log(message, color){
        this.bus.emit(EVENTS.LOG_EMITTED, { level: "log", message, color })
    }

    debug(message){
        console.debug(message)
    }
}