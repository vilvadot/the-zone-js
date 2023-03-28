import { Entities } from "../entities/index.js";
import { GameMode } from "../GameMode.js";
import { findAdjacent } from "../util/entities.js";

// TODO: test

export class Talk {
  static run(entities: Entities, gameMode: GameMode) {
    const player = entities.find((entity) => entity.isPlayer);
    const target = findAdjacent(player, entities);
    if (!target.isTalkable) return;

    gameMode.toggleDialog();

    console.log("talking to", target.name);
  }
}