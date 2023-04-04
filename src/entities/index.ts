import { Artifact } from "./Artifact.js";
import { Corpse } from "./Corpse.js";
import { Enemy } from "./enemies/Enemy.js";
import { EntityManager } from "./entity-manager.js";
import { Player } from "./Player.js";

export type Entity = Player | Enemy | Artifact | Corpse;
export type Entities = any[];
export { findPlayer } from "./helpers.js";

export default { Enemy, Player, Artifact, Corpse, EntityManager };
