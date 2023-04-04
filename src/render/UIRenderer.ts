import { EVENTS } from "../actions.js";
import { Bus } from "../infra/bus.js";
import { TradeDialog, Health, LogMessages, Inventory, UIComponent, TurnsCounter } from "./ui/index.js";
import { GameState } from "../Game.js";
import { InspectTooltip } from "./ui/InspectTooltip.js";
import { MousePosition } from "../index.js";

export class UIRenderer {
  bus: Bus;
  components: Array<UIComponent>;

  constructor(bus) {
    this.bus = bus;

    this.renderAsyncComponents();

    this.components = [
      new Health(),
      new TurnsCounter(),
      new Inventory(this.bus),
      new TradeDialog(this.bus)
    ]
  }

  private renderAsyncComponents() {
    const logs = new LogMessages();

    this.bus.subscribe(EVENTS.LOG_EMITTED, ({ message, color }) => {
      logs.update(message, color);
    });
  }

  update(gameState: GameState, mouse: MousePosition) {
    this.components.forEach(component => component.update(gameState))
    new InspectTooltip().update(gameState, mouse)
  }
}