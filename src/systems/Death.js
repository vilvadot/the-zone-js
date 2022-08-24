import { PLAYER_ID } from "../entities/Player.js";
import { findTile } from "../util.js";

export class Death {
  static run(entities, game) {
    for (const entity of entities) {
      const player = entities.find(({ isPlayer }) => isPlayer);
      if (!player?.health?.value) game.reset();

      const { health, sprite } = entity;
      if (!health || !sprite) continue;

      if (health.value <= 0) {
        let $node = findTile(entity.id);
        if ($node) $node.remove();
        game.kill(entity);
      }
    }
  }
}
