import { ACTION } from "../actions.js";
import { Entities } from "../entities/index.js";

export class Targetting {
  static run(entities: Entities, action?: ACTION) {
    for (const { position, target, collision } of entities) {
      if (!position || !target || !collision) continue;
      if (!action?.payload) continue;

      const { direction } = action.payload;

      // Todo: Decouple from key input
      if (direction === "east") {
        target.id = collision.areas.east[0];
      } else if (direction === "west") {
        target.id = collision.areas.west[0];
      } else if (direction === "north") {
        target.id = collision.areas.north[0];
      } else if (direction === "south") {
        target.id = collision.areas.south[0];
      }
    }
  }
}
