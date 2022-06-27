export class Death {
  static run(entities, game) {
    for (const entity of entities) {
      const { id, health, sprite } = entity;
      if (!health || !sprite) continue;

      if (health <= 0) {
        sprite.node.remove()
        game.kill(entity)
      }
    }
  }

  static _attack(target, damage) {
    target.health -= damage;
    console.log(`Attacked ${target.id} for ${damage} points!`);
  }
}
