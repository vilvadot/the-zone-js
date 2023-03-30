import { GameState } from "../../Game.js";
import { createNode } from "../../util/index.js";
import { UIComponent } from "./UIComponent.js";

export class Inventory implements UIComponent {
  node: HTMLElement;

  constructor() {
    this.node = document.querySelector("#inventory") as HTMLDivElement;
    this.create()
  }

  update(gameState: GameState) {
    this.create()

    const $container = this.node.querySelector(".panel--content")!;
    const inventory = gameState.player.inventory.content;
    inventory.forEach((item) => {
      const text = `${item.name} - ${item.quantity}`;
      const row = createNode({ type: "p", content: text, id: item.id });

      $container.appendChild(row);
    });
  }

  create() {
    this.node.innerHTML = `
    <h2 class="panel--title">Inventory</h2>
      <div class="panel--content">
    </div>
    `
  }
}
