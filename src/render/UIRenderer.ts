import { EVENTS } from "../events.js";
import { LogMessages } from "./ui/LogMessages.js";
import { TurnsCounter } from "./ui/TurnsCounter.js";
import { HealthBar } from "./ui/HealthBars.js";
import { Bus } from "../infra/bus.js";
import { findOrCreateNode } from "../util/index.js";
import { Player } from "../entities/Player.js";
import { GlobalCoordinates } from "../GlobalCoordinates.js";

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

  update(player: Player, turn: number, coordinates: GlobalCoordinates) {
    AreaCoordinates.update(coordinates);
    TurnsCounter.update(turn);
    HealthBar.update(player.health.value, player.health.maxValue);
  }
}

class AreaCoordinates {
  static update(coordinates: GlobalCoordinates) {
    let icon = " ";
    if (coordinates.isOrigin()) icon = "🏠 ";

    const $turnsCounter = findOrCreateNode(
      "#ui_area-coordinates",
      ".ui_bottom-bar"
    );
    $turnsCounter.className = "ui_bar-module";
    $turnsCounter.innerHTML = `Coordinates: ${icon}${coordinates}`;
  }
}
