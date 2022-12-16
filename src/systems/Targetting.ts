import { KEYS } from "../input.js";

export class Targetting {
  static run(entities, action?) {
    for (const { position, target, collision } of entities) {
      if (!position || !target || !collision) continue;

      if (!action) continue;

      const { key } = action;
      const { ArrowRight, ArrowLeft, ArrowUp, ArrowDown, KeyA, KeyW, KeyS, KeyD } = KEYS

      // Todo: Decouple from key input
      if (key === ArrowRight || key === KeyD) {
        target.id = collision.areas.east[0];
      } else if (key === ArrowLeft || key === KeyA) {
        target.id = collision.areas.west[0];
      } else if (key === ArrowUp || key === KeyW) {
        target.id = collision.areas.north[0];
      } else if (key === ArrowDown || key === KeyS) {
        target.id = collision.areas.south[0];
      }
    }
  }
}
