import { INPUTS } from "../input.js";

export class KeyboardMovement {
  static run(entities, action, world) {
    for (const { keyboardControlled, position } of entities) {
      if (!keyboardControlled || !position) continue;
      const PLAYER_STEP = 1;

      const candidate = { x: position.x, y: position.y };
      if (action.key === INPUTS.ArrowRight) candidate.x += PLAYER_STEP;
      if (action.key === INPUTS.ArrowLeft) candidate.x -= PLAYER_STEP;
      if (action.key === INPUTS.ArrowUp) candidate.y -= PLAYER_STEP;
      if (action.key === INPUTS.ArrowDown) candidate.y += PLAYER_STEP;

      if(entities.some(entity => entity.position.x === candidate.x && entity.position.y === candidate.y)) continue;
      if (world.isBlocked(candidate.x, candidate.y)) continue;

      position.x = candidate.x;
      position.y = candidate.y;
    }
  }
}