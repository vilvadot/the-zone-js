import { findOrCreateNode } from "../util.js";

export class HealthCounter {
  static update(playerHealth) {
    if (!playerHealth) return;
    
    const currentValue = playerHealth.value;
    const maxValue = playerHealth.maxValue;

    const $health = findOrCreateNode("#ui_health-counter", ".ui_bottom-bar");
    $health.className = "ui_bar-module";

    $health.innerHTML = `Health: ${currentValue}/${maxValue}`;
  }
}
