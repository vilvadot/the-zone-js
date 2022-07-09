import { PLAYER_ID } from "../entities/Player.js";

export class Death {
  static run(entities, game) {
    for (const entity of entities) {
      const player = entities.find(({ id }) => id === PLAYER_ID);
      if(!player?.health.value) game.reset()

      const { health, sprite } = entity;
      if (!health || !sprite) continue;

      if (health.value <= 0) {
        if (sprite.node) sprite.node.remove();
        game.kill(entity);
      }
    }
  }
}