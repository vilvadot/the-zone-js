export class Death {
  static run(entities, game) {
    for (const entity of entities) {
      const { health, sprite } = entity;
      if (!health || !sprite) continue;

      if (health.value <= 0) {
        if(sprite.node) sprite.node.remove()
        game.kill(entity)
      }
    }
  }
}
