import { Entities } from "../entities/index.js";
import { ACTION, MOVE_PAYLOAD } from "../actions.js";

export class KeyboardControl {
  static run(action: ACTION, entities: Entities) {
    if (action.name !== "move") return

    for (const { keyboardControlled, velocity } of entities) {
      if (!keyboardControlled || !velocity) continue;

      const STEP = 1;

      const { direction } = action.payload as MOVE_PAYLOAD;

      if (direction === "east") velocity.x += STEP;
      if (direction === "west") velocity.x -= STEP;
      if (direction === "north") velocity.y -= STEP;
      if (direction === "south") velocity.y += STEP;
    }
  }
}