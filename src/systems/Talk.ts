import { Entities } from "../entities/index.js";
import { isAdjacent } from "../util/coordinates.js";
import { Player } from "../entities/Player.js";
import { GameMode } from "../GameMode.js";

// TODO: test

export class Talk {
  static run(entities: Entities, gameMode: GameMode) {
    const player = entities.find((entity) => entity.isPlayer);
    const target = findAdjacent(player, entities);
    if (!target) return;

    gameMode.toggleDialog();

    console.log("talking to", target.name);
  }
}

export const findAdjacent = (player: Player, entities: Entities) => {
  return entities.find((entitity) => isEntityAdjacent(player, entitity));
};

export const isEntityAdjacent = (entityA, entityB) => {
  return isAdjacent(entityA.position, entityB.position);
};
