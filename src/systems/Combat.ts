import { EVENTS } from "../actions.js";
import { Bus } from "../infra/bus.js";
import { LOG_LEVEL } from "../infra/logger.js";
import { capitalize, isAdjacent, isOver } from "../util/index.js";

export class Combat {
  static run(bus: Bus, logger, entities) {
    for (const { name, position, target, damage } of entities) {
      if (!position || !target || !damage) continue;

      const targetEntity = entities.find(({ id, health }) => {
        return id === target.id && health?.value > 0;
      });
      if (!targetEntity) continue;

      if (name === "Anomaly") {
        // TODO: Extract to own system ??
        if (isOver(targetEntity.position, position))
          this.attack(name, targetEntity, damage.value, bus, logger);
        continue;
      }

      if (isAdjacent(targetEntity.position, position))
        this.attack(name, targetEntity, damage.value, bus, logger);
    }
  }

  private static attack(name, target, damage, bus, logger) {
    target.health.value -= damage;
    bus.emit(EVENTS.HIT, { x: target.position.x, y: target.position.y });

    logger.log(
      `${capitalize(name)} Attacked ${capitalize(
        target.name
      )} for ${damage} damage`,
      LOG_LEVEL.danger
    );
  }
}
