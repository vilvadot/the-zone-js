import { positionNodeInCanvas, findOrCreateNode } from "../util.js";
import { COLORS } from "../tiles.js";

export class HealthBars {
  static update(entities) {
    entities.forEach((entity) => {
      const id = `#ui-health-${entity.id}`;
      if (!entity.health)
        return document.querySelector(id)?.remove();

      const { value, maxValue } = entity.health;
      const { x, y } = entity.position;
      const width = 15;

      const $healthBar = findOrCreateNode(id, "#game");
      $healthBar.style = ` 
      position:absolute;
      background: lightgrey;
      width: ${width}px;
      height: 3px;
  `;
      $healthBar.className = "animate--movement";

      const $remaingHealthBar = findOrCreateNode(
        `#ui-health--remaining-${entity.id}`,
        id
      );
      $remaingHealthBar.style = `
    width: ${width * (value / maxValue)}px;
    background: ${COLORS.health};
    height: 100%;
  `;

      positionNodeInCanvas($healthBar, x + 0.1, y - 0.1);
    });
  }
}
