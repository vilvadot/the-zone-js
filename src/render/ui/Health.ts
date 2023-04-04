import { GameState } from "../../Game";
import { UIComponent } from "./UIComponent";

export class Health implements UIComponent {
  node: HTMLElement;

  constructor() {
    this.node = document.querySelector("#health") as HTMLDivElement;
    this.create();
  }

  update(gameState: GameState) {
    const { player } = gameState;
    const remainingHealth = player.health.value;
    const totalHealth = player.health.maxValue;

    const currentHealth = Math.ceil(remainingHealth);
    const health = "■".repeat(currentHealth);
    const damage = "◻︎".repeat(totalHealth - currentHealth);

    const $container = document.querySelector("#health-bar") as HTMLDivElement;
    $container.innerHTML = `${health}${damage}`;
  }

  create() {
    this.node.innerHTML = `
      <h2 class="panel--title">Health</h2>
      <div class="panel--content">
        <span id="health-bar"></span>
      </div>`;
  }
}
