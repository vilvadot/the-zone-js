export class Death {
  static run(entities) {
    for (const { health, sprite } of entities) {
      if (health <= 0) {
        sprite.tile = "X";
        sprite.color = "red";
      }
    }
  }

  static _attack(target, damage) {
    target.health -= damage;
    console.log(`Attacked ${target.id} for ${damage} points!`);
  }
}
