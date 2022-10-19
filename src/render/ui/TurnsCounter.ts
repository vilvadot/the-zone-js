import { findOrCreateNode } from "../../util.js";

export class TurnsCounter {
  static update(turn) {
    const $turnsCounter = findOrCreateNode(
      "#ui_turn-counter",
      ".ui_bottom-bar"
    );
    $turnsCounter.className = "ui_bar-module";
    $turnsCounter.innerHTML = `Turns: ${turn}`;
  }
}
