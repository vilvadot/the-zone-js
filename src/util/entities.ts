import { Entities } from "../entities/index.js";
import { Player } from "../entities/Player.js";
import { isAdjacent } from "./coordinates.js";

export const findAdjacent = (player: Player, entities: Entities) => {
    return entities.find((entitity) => isEntityAdjacent(player, entitity));
  };
  
  export const isEntityAdjacent = (entityA, entityB) => {
    return isAdjacent(entityA.position, entityB.position);
  };
  