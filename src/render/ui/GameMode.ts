import { GameState } from "../../Game";
import { UIComponent } from "./UIComponent";

export class GameMode implements UIComponent {
  node: HTMLElement;

  constructor() {
    this.node = document.querySelector("#mode-indicator") as HTMLDivElement;
    this.create()
  }

  update(gameState: GameState) {
    this.reset()

    const { mode } = gameState;

    if(!mode.isAiming()) return

    this.node.innerHTML = `${mode.name}`;
  }

  reset(){
    this.node.innerHTML = ``
  }

  create() {
    this.reset()
    this.node.style.position = `absolute`
    this.node.style.bottom = `0`
    this.node.style.right = `10`
    this.node.style.zIndex = `2`
  }
}
