import { findTile } from "../util.js";

export class Death {
  static run(entities, entityManager) {
    for (const entity of entities) {
      const player = entities.find(({ isPlayer }) => isPlayer);
      if (!player?.health?.value) game.reset();

      const { health, sprite } = entity;
      if (!health || !sprite) continue;

      if (health.value <= 0) {
        entityManager.kill(entity);
      }
    }
  }
}
