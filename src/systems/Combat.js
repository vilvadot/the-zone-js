import { isInrange } from "../util.js";

export class Combat {
  static run(entities) {
    for (const { id, position, target, damage } of entities) {
      if (!position || !target || !damage) continue;

      const targetEntity = entities.find(({ id, health }) => {
        return id === target.id && health.value > 0;
      });
      if (!targetEntity) continue;

      if (isInrange(targetEntity.position, position))
        this._attack(id, targetEntity, damage);
    }
  }

  static _attack(id, target, damage) {
    target.health.value -= damage;
    console.log(`⚔️ | ${id} Attacked ${target.id} for ${damage} points!`);
  }
}
