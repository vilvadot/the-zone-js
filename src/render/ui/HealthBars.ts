import { CELL_SIZE } from "../../config.js";
import { findOrCreateNode } from "../../util/index.js";

export class HealthBars {
  static update(entities) {
    entities.forEach((entity) => {
      const barId = `#ui_health-${entity.id}`;

      if (!entity.health) return document.querySelector(barId)?.remove();

      this.createHealthBar(barId, entity.id);
      this.createRemainingHealthBar(CELL_SIZE, entity, barId)
    });
  }

  static createHealthBar(id, entityId) {
    const $healthBar = findOrCreateNode(id, `#${entityId}`);
    $healthBar.className = "ui_health-bar animate--movement";
    $healthBar.style.width = CELL_SIZE;
    $healthBar.style.marginTop = `-${CELL_SIZE + 3}px`

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
