import { positionNodeInCanvas, findOrCreateNode } from "../util.js";

export class HealthBars {
  static update(entities) {
    entities.forEach((entity) => {
      const barId = `#ui_health-${entity.id}`;

      if (!entity.health) return document.querySelector(barId)?.remove();

      const width = 15;

      const $healthBar = this.createHealthBar(barId, width);
      this.createRemainingHealthBar(width, entity, barId)

      const { x, y } = entity.position;
      positionNodeInCanvas($healthBar, x + 0.1, y - 0.1);
    });
  }

  static createHealthBar(id, width) {
    const $healthBar = findOrCreateNode(id, "#game");
    $healthBar.className = "ui_health-bar animate--movement";
    $healthBar.style.width = width;

    return $healthBar;
  }

  static createRemainingHealthBar(width, entity, parentId) {
    const remainingId = `#ui_health-${entity.id}-remaining`;
    const { value, maxValue } = entity.health;
    const $remaingHealthBar = findOrCreateNode(remainingId, parentId);
    $remaingHealthBar.className = "ui_health-bar--remaining"
    $remaingHealthBar.style.width = width * (value / maxValue);

    return $remaingHealthBar;
  }
}
