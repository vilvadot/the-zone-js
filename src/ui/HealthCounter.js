import { findOrCreateNode } from "../util.js";

export class HealthCounter {
  static update(player) {
    if (!player)
      return;
    const currentValue = player.health.value;
    const maxValue = player.health.maxValue;

    const $health = findOrCreateNode("#ui_health-counter", ".ui_bottom-bar");
    $health.className = "ui_bar-module";

    $health.innerHTML = `Health: ${currentValue}/${maxValue}`;
  }
}
