export class Combat {
  static run(entities) {
    for (const { position, target: targetId, damage } of entities) {
      if (!position || !targetId || !damage)
        return;
      const target = entities.find(({ id }) => id === targetId);

      const distanceX = Math.abs(target.position.x - position.x);
      const distanceY = Math.abs(target.position.y - position.y);

      const horizontallyInRange = distanceX === 0 && distanceY === 1;
      const verticallyInRange = distanceX === 1 && distanceY === 0;
      if (horizontallyInRange || verticallyInRange)
        this._attack(target, damage);
    }
  }

  static _attack(target, damage) {
    target.health -= damage;
    console.log(`Attacked ${target.id} for ${damage} points!`);
  }
}
