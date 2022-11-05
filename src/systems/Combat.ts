import { isInrange } from "../util.js";

export class Combat {
  static run(logger, entities) {
    for (const { name, position, target, damage } of entities) {
      if (!position || !target || !damage) continue;

      const targetEntity = entities.find(({ id, health }) => {
        return id === target.id && health?.value > 0;
      });
      if (!targetEntity) continue;

      if (isInrange(targetEntity.position, position))
        this._attack(name, targetEntity, damage.value, logger);
    }
  }

  static _attack(name, target, damage, logger) {
    target.health.value -= damage;
    logger.log(
      `"${name}" Attacked "${target.name}" for ${damage} damage!`,
      'red'
    );
  }
}
