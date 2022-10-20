import { INPUTS } from "../input.js";

export class Targetting {
  static run(entities, action?) {
    for (const { position, target, collision } of entities) {
      if (!position || !target || !collision) continue;

      if (!action) continue;

      if (action.key === INPUTS.ArrowRight) {
        target.id = collision.areas.east[0];
      } else if (action.key === INPUTS.ArrowLeft) {
        target.id = collision.areas.west[0];
      } else if (action.key === INPUTS.ArrowUp) {
        target.id = collision.areas.north[0];
      } else if (action.key === INPUTS.ArrowDown) {
        target.id = collision.areas.south[0];
      }
    }
  }
}
