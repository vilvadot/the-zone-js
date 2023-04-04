import { MousePosition } from "../../index.js";
import { GameState } from "../../Game.js";
import { Entity } from "../../entities/index.js";
import { Health } from "./Health.js";

export class InspectTooltip {
  node: HTMLElement;

  constructor() {
    this.node = document.querySelector("#inspect-tooltip")!;
    this.create()
  }

  create() {
    this.node.innerHTML = ``
  }

  private hide() {
    this.node.style.visibility = 'hidden';
  }

  private show() {
    this.node.style.visibility = 'visible';
  }

  update({ entities }: GameState, mouse: MousePosition) {
    this.hide()

    if (!mouse) return

    const entityHovered: Entity = entities.find((entity) => {
      if (!entity.position) return;
      return entity.position.x === mouse.tileX && entity.position.y === mouse.tileY;
    });

    if (!entityHovered) return;

    let content = `
      <h1>${entityHovered.name}</h1>
    `

    if ('health' in entityHovered) {
      const { health } = entityHovered;
      content += `<span>Health: ${health.value}/${health.maxValue}</span>`
    }

    this.show()

    const offset = 10;
    const x = mouse.x! + offset;
    const y = mouse.y! + offset;

    this.node.style.left = `${x}`;
    this.node.style.top = `${y}`
    this.node.innerHTML = content
  }
}