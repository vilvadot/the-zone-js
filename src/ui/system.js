import { PLAYER_ID } from "../entities/Player.js";
import { EVENTS } from "../events.js";
import { LogMessages } from "./LogMessages.js";
import { TurnsCounter } from "./TurnsCounter.js";
import { HealthCounter } from "./HealthCounter.js";
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

  update(entities, player, turn) {
    TurnsCounter.update(turn);
    HealthCounter.update(player);
    HealthBars.update(entities);
  }
}
