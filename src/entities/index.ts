import { Artifact } from "./Artifact.js";
import { Corpse } from "./Corpse.js";
import { Enemy } from "./Enemy.js";
import { EntityManager } from "./entity-manager.js";
import { Player } from "./Player.js";

export type Entity = Enemy | Player | Artifact | Corpse;
export type Entities = any[];

export default { Enemy, Player, Artifact, Corpse, EntityManager };
