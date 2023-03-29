import { KEYS } from "../input.js";

export class Targetting {
  static run(entities, action?) {
    for (const { position, target, collision } of entities) {
      if (!position || !target || !collision) continue;

      if (!action) continue;

      const { key } = action;
      const { ArrowRight, ArrowLeft, ArrowUp, ArrowDown, A, W, S, D } = KEYS

      // Todo: Decouple from key input
      if (key === ArrowRight || key === D) {
        target.id = collision.areas.east[0];
      } else if (key === ArrowLeft || key === A) {
        target.id = collision.areas.west[0];
      } else if (key === ArrowUp || key === W) {
        target.id = collision.areas.north[0];
      } else if (key === ArrowDown || key === S) {
        target.id = collision.areas.south[0];
      }
    }
  }
}
