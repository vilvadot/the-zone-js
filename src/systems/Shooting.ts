import { Bus } from "../infra/bus";
import { Logger } from "../infra/logger";

const BULLET_DAMAGE = 3;

export class Shooting {
  static run(bus: Bus, logger: Logger, entities, x, y) {
    const target = entities.find((entity) => {
      return entity.position.x === x && entity.position.y === y;
    });

    if (!target)
      return;

    for (const entity of entities) {
      if (entity.id !== target.id || target.id === "player")
        continue;
      entity.health.value -= BULLET_DAMAGE;

      logger.log(
        `"player" shot at "${entity.name}" for ${BULLET_DAMAGE} damage!`,
        "blue"
      );
    }
  }
}
