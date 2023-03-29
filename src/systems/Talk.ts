import { Entities } from "../entities/index.js";
import { GameMode } from "../GameMode.js";
import { findAdjacent } from "../util/entities.js";

// TODO: test

export class Talk {
  static run(action, entities: Entities, gameMode: GameMode) {
    if (action.name !== "talk") return

    const player = entities.find((entity) => entity.isPlayer);
    const target = findAdjacent(player, entities);

    if (!target?.isTalkable) return;

    gameMode.toggleDialog();

    console.log("talking to", target.name);
  }
}