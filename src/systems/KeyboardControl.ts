import { Entities } from "../entities/index.js";
import { ACTION_EXECUTED_PAYLOAD } from "../events.js";
import { KEYS } from "../input.js";

export class KeyboardControl {
  static run(entities: Entities, action: ACTION_EXECUTED_PAYLOAD) {
    if (!action) return
    for (const { keyboardControlled, velocity } of entities) {
      if (!keyboardControlled || !velocity) continue;

      const STEP = 1;

      const { key } = action;
      const { ArrowRight, ArrowLeft, ArrowUp, ArrowDown, KeyA, KeyW, KeyS, KeyD } = KEYS;

      if (key === ArrowRight || key === KeyD) velocity.x += STEP;
      if (key === ArrowLeft || key === KeyA) velocity.x -= STEP;
      if (key === ArrowUp || key === KeyW) velocity.y -= STEP;
      if (key === ArrowDown || key === KeyS) velocity.y += STEP;
    }
  }
}