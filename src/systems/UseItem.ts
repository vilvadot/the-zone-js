import { ACTION, ACTION_NAME, TRADE_PAYLOAD } from "../actions.js";
import { removeFromInventory } from "../entities/helpers.js";
import { Entities, findPlayer } from "../entities/index.js";
import { Player } from "../entities/Player.js";
import { Logger } from "../infra/logger.js";

export class UseItem {
  static run(action: ACTION, logger: Logger, entities: Entities) {
    if (action.name !== ACTION_NAME.USE) return;
    const { item } = action.payload as TRADE_PAYLOAD;

    if (!item.effect) return;

    const player = findPlayer(entities);
    let message;

    if (item.effect.name === "heal") {
      message = Heal.apply(player, item.effect.amount);
    }

    removeFromInventory(player.inventory, item, 1);
    logger.log(message, "purple");
  }
}

class Heal {
  static apply(player: Player, amount: number) {
    if (player.health.value === player.health.maxValue) {
      return `You are already at max health`;
    }

    player.health.value += amount;

    return `You healed ${amount} points`;
  }
}
