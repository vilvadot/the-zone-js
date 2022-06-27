import { INPUTS } from "../input.js";

export class KeyboardControl {
  static run(entities, action) {
    for (const { keyboardControlled, position, velocity } of entities) {
      if (!keyboardControlled || !position || !velocity) continue;
      const STEP = 1;

      if (action.key === INPUTS.ArrowRight) velocity.x += STEP;
      if (action.key === INPUTS.ArrowLeft) velocity.x -= STEP;
      if (action.key === INPUTS.ArrowUp) velocity.y -= STEP;
      if (action.key === INPUTS.ArrowDown) velocity.y += STEP;
    }
  }
}