import { EVENTS } from "../actions.js";
import { Bus } from "../infra/bus.js";
import { isAdjacent, isOver } from "../util/index.js";

export class Combat {
  static run(bus: Bus, logger, entities) {
    for (const { name, position, target, damage } of entities) {
      if (!position || !target || !damage) continue;

      const targetEntity = entities.find(({ id, health }) => {
        return id === target.id && health?.value > 0;
      });
      if (!targetEntity) continue;

      if(name === "Anomaly") { // TODO: Extract to own system ??
        if(isOver(targetEntity.position, position)) this._attack(name, targetEntity, damage.value, bus, logger);
        continue;
      }

      if (isAdjacent(targetEntity.position, position))
        this._attack(name, targetEntity, damage.value, bus, logger);
    }
  }

  static _attack(name, target, damage, bus, logger) {
    target.health.value -= damage;
    bus.emit(EVENTS.HIT, {x: target.position.x, y: target.position.y})
    logger.log(
      `"${name}" Attacked "${target.name}" for ${damage} damage`,
      'red'
    );
  }
}
