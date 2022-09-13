import { INPUTS } from "../input.js";

export class KeyboardControl {
  static run(entities, action) {
    if(!action) return 
    for (const { keyboardControlled, velocity } of entities) {
      if (!keyboardControlled || !velocity) continue;

      const STEP = 1;

      if (action.key === INPUTS.ArrowRight) velocity.x += STEP;
      if (action.key === INPUTS.ArrowLeft) velocity.x -= STEP;
      if (action.key === INPUTS.ArrowUp) velocity.y -= STEP;
      if (action.key === INPUTS.ArrowDown) velocity.y += STEP;
    }
  }
}