import { INPUTS } from "../input.js";

export class KeyboardControl {
  static run(entities, action) {
    if (!action) return
    for (const { keyboardControlled, velocity } of entities) {
      if (!keyboardControlled || !velocity) continue;

      const STEP = 1;

      const { key } = action;
      const { ArrowRight, ArrowLeft, ArrowUp, ArrowDown, KeyA, KeyW, KeyS, KeyD } = INPUTS;

      if (key === ArrowRight || key === KeyD) velocity.x += STEP;
      if (key === ArrowLeft || key === KeyA) velocity.x -= STEP;
      if (key === ArrowUp || key === KeyW) velocity.y -= STEP;
      if (key === ArrowDown || key === KeyS) velocity.y += STEP;
    }
  }
}