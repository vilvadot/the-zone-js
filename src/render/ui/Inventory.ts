import { ACTION_NAME, EVENTS } from "../../actions.js";
import { GameState } from "../../Game.js";
import { Bus } from "../../infra/bus.js";
import { createNode } from "../../util/index.js";
import { UIComponent } from "./UIComponent.js";

export class Inventory implements UIComponent {
  node: HTMLElement;
  bus: Bus;

  constructor(bus) {
    this.node = document.querySelector("#inventory") as HTMLDivElement;
    this.bus = bus;
    this.create();
  }

  update(gameState: GameState) {
    this.create();

    const $container = this.node.querySelector(".panel--content")!;
    const inventory = gameState.player.inventory.content;
    inventory.forEach((item) => {
      const text = `${item.name} (${item.quantity})`;
      const row = createNode({
        type: "a",
        content: text,
        id: item.id,
        className: "interactive",
        style: "display: block;",
      });
      row.addEventListener("click", () => {
        console.log("click!");
        this.bus.emit(EVENTS.ACTION_EXECUTED, {
          name: ACTION_NAME.USE,
          payload: { item },
        });
      });

      $container.appendChild(row);
    });
  }

  create() {
    this.node.innerHTML = `
    <h2 class="panel--title">Inventory</h2>
      <div class="panel--content">
    </div>
    `;
  }
}
