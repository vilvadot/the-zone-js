import { ACTION, ACTION_NAME } from "../actions.js";
import { EntityManager } from "../entities/entity-manager.js";
import { Entities } from "../entities/index.js";
import { Player } from "../entities/Player.js";
import { LOG_LEVEL, Logger } from "../infra/logger.js";

export class Pickup {
  static run(action: ACTION, entities: Entities, entityManager: EntityManager, logger: Logger) {
    if (action.name !== ACTION_NAME.PICKUP) return;

    const player = entities.find(({ isPlayer }) => isPlayer) as Player;
    const itemId = player.collision.areas.overlap[0];
    const item = entityManager.get(itemId);

    if (!item) return;

    entityManager.remove(item);
    player.inventory.content.push(item);
    logger.log(`${player.name} picked up ${item.name}.`, LOG_LEVEL.info);
  }
}
