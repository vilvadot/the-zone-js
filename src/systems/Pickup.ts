import { EntityManager } from "../entities/entity-manager.js";
import { Entities, Entity } from "../entities/index.js";
import { Player } from "../entities/Player.js";
import { ACTION_EXECUTED_PAYLOAD } from "../events.js";
import { KEYS } from "../input.js";


// TODO: test

export class Pickup {
  static run(entities: Entities, action: ACTION_EXECUTED_PAYLOAD, entityManager: EntityManager) {
    if (action.key !== KEYS.KeyE) return;
    const player = entities.find(({ isPlayer }) => isPlayer) as Player;
    const itemId = player.collision.areas.overlap[0];
    const item = entityManager.get(itemId)
    console.log(item)
    if (!item?.inventoryVersion) return;

    entityManager.remove(item)
    player.inventory.content.push(item.inventoryVersion);
  }
}
