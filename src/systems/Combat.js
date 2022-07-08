import { isInrange } from "../util.js";
import { ANIMATIONS } from "./Animation.js";

export class Combat {
  static run(entities, logger) {
    for (const { id, name, position, target, damage } of entities) {
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
    target.animation.name = ANIMATIONS.hit.name;
    target.animation.isActive = true;
    logger.log(
      `"${name}" Attacked "${target.name}" for ${damage} damage!`,
      target.sprite.color
    );
  }
}
