import { BULLET_DAMAGE } from "../Game";

export class Shooting {
  static run(logger, entities, x, y) {
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
