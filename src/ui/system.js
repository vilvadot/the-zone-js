import { EVENTS } from "../events.js";
import { LogMessages } from "./LogMessages.js";
import { TurnsCounter } from "./TurnsCounter.js";
import { HealthBars } from "./HealthBars.js";

export class UIRendering {
  constructor(bus) {
    this.bus = bus;
    this._asyncSubscriptions();
  }

  _asyncSubscriptions() {
    this.bus.subscribe(EVENTS.LOG_EMITTED, ({ message, color }) => {
      LogMessages.update(message, color);
    });
  }

  update(entities, turn) {
    TurnsCounter.update(turn);
    HealthBars.update(entities);
  }
}
