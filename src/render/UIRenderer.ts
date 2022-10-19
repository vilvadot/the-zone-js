import { EVENTS } from "../events.js";
import { LogMessages } from "./ui/LogMessages.js";
import { TurnsCounter } from "./ui/TurnsCounter.js";
import { HealthBars } from "./ui/HealthBars.js";
import { Bus } from "../infra/bus.js";

export class UIRenderer {
  bus: Bus;

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
