import { GameState } from "../../Game";
import { UIComponent } from "./UIComponent";

export class TurnsCounter implements UIComponent {
  node: HTMLElement;

  constructor() {
    this.node = document.querySelector("#turns") as HTMLDivElement;
    this.create()
  }

  update(gameState: GameState) {
    const { turn } = gameState;

    const $container = document.querySelector("#turns-counter") as HTMLDivElement;
    $container.innerHTML = `${turn}`
  }

  create() {
    this.node.innerHTML = `
      <h2 class="panel--title">Turn</h2>
      <div class="panel--content">
        <span id="turns-counter"></span>
      </div>`
  }
}
