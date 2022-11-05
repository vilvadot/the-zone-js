import { EVENTS } from "../events.js";
import { LogMessages } from "./ui/LogMessages.js";
import { TurnsCounter } from "./ui/TurnsCounter.js";
import { HealthBars } from "./ui/HealthBars.js";
import { Bus } from "../infra/bus.js";
import { findOrCreateNode } from "../util/index.js";

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

  update(entities, turn, navigation) {
    AreaCoordinates.update(navigation)
    TurnsCounter.update(turn);
    HealthBars.update(entities);
  }
}

class AreaCoordinates {
  static update(coordinates) {
    let icon = " ";
    if(coordinates === "0,0") icon = "🏠 "

    const $turnsCounter = findOrCreateNode(
      "#ui_area-coordinates",
      ".ui_bottom-bar"
    );
    $turnsCounter.className = "ui_bar-module";
    $turnsCounter.innerHTML = `Coordinates: ${icon}${coordinates}`;
  }
}
