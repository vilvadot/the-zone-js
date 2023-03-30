import { GameState } from "../../Game";
import { UIComponent } from "../UIComponent";

export class HealthBar implements UIComponent {
  constructor() {
    this.create()
  }

  update(gameState: GameState) {
    const { player } = gameState;
    const remainingHealth = player.health.value;
    const totalHealth = player.health.maxValue;

    const currentHealth = Math.ceil(remainingHealth)
    const health = "■".repeat(currentHealth)
    const damage = "◻︎".repeat(totalHealth - currentHealth)

    const $container = document.querySelector("#health-bar") as HTMLDivElement;
    $container.innerHTML = `${health}${damage}`
  }

  create() {
    const component = document.querySelector("#health") as HTMLDivElement;
    component.innerHTML = `
      <h2 class="ui_panel--title">Health</h2>
      <div class="ui_panel--content">
        <span id="health-bar"></span>
      </div>`
  }
}
