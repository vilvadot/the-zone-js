import { GameState } from "../../Game.js";
import { createNode } from "../../util/index.js";

export class InventoryScreen {
  constructor() {
    this.create()
  }

  update(gameState: GameState) {
    const $container = document.querySelector(
      "#inventory .ui_panel--content"
    ) as HTMLDivElement;

    this.reset($container)

    const inventory = gameState.player.inventory.content;

    inventory.forEach((item) => {
      const text = `${item.name} - ${item.quantity}`;
      const row = createNode({ type: "p", content: text, id: item.id });

      $container.appendChild(row);
    });
  }

  reset($container: HTMLElement) {
    $container.innerHTML = "";
  }

  create() {
    const component = document.querySelector('#inventory')!
    component.innerHTML = `
    <h2 class="ui_panel--title">Inventory</h2>
      <div class="ui_panel--content">
    </div>
    `
  }
}
