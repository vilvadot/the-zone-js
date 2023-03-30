import { EVENTS } from "../actions.js";
import { LogMessages } from "./ui/LogMessages.js";
import { TurnsCounter } from "./ui/TurnsCounter.js";
import { HealthBar } from "./ui/HealthBar.js";
import { Bus } from "../infra/bus.js";
import { findOrCreateNode } from "../util/index.js";
import { GlobalCoordinates } from "../GlobalCoordinates.js";
import { ContextualDialog } from "./ui/ContextualDialog.js";
import { InventoryScreen } from "./ui/InventoryScreen.js";
import { GameState } from "../Game.js";

interface UIComponent {
  update: (gameState: GameState) => void,
}

export class UIRenderer {
  bus: Bus;
  components: Array<UIComponent>;

  constructor(bus) {
    this.bus = bus;
    this._asyncSubscriptions();
    this.components = [
      new InventoryScreen(),
    ]
  }

  _asyncSubscriptions() {
    this.bus.subscribe(EVENTS.LOG_EMITTED, ({ message, color }) => {
      LogMessages.update(message, color);
    });
  }

  update(gameState: GameState) {
    const { player, turn, coordinates, mode, entities } = gameState;

    AreaCoordinates.update(coordinates);
    TurnsCounter.update(turn);
    HealthBar.update(player.health.value, player.health.maxValue);
    ContextualDialog.update(mode, this.bus, player, entities);

    this.components.forEach(component => component.update(gameState))
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
