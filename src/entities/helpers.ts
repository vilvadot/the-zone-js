import { Entities } from ".";
import { Player } from "./Player";

export const findPlayer = (entities: Entities) => entities.find(({ isPlayer }) => isPlayer) as Player;