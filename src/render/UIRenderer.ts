import { EVENTS } from "../actions.js";
import { Bus } from "../infra/bus.js";
import { TradeDialog, Health, LogMessages, Inventory, UIComponent } from "./ui/index.js";
import { GameState } from "../Game.js";

export class UIRenderer {
  bus: Bus;
  components: Array<UIComponent>;

  constructor(bus) {
    this.bus = bus;

    this.renderAsyncComponents();

    this.components = [
      new Inventory(this.bus),
      new Health(),
      new TradeDialog(this.bus)
    ]
  }

  private renderAsyncComponents() {
    const logs = new LogMessages;

    this.bus.subscribe(EVENTS.LOG_EMITTED, ({ message, color }) => {
      logs.update(message, color);
    });
  }

  update(gameState: GameState) {
    this.components.forEach(component => component.update(gameState))
  }
}