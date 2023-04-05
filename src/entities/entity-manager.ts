import { Cache } from "../data-structures/Cache.js";
import { Player } from "./Player.js";
import { Entities, Entity } from "./index.js";
import { EnemySpawner } from "../spawners/EnemySpawner.js";
import { GlobalCoordinates } from "../GlobalCoordinates.js";
import { ArtifactSpawner } from "../spawners/ArtifactSpawner.js";
import { NPCSpawner } from "../spawners/NPCSpawner.js";
import { AnomalySpawner } from "../spawners/AnomalySpawner.js";
import { Spawner } from "../spawners/index.js";
import { Chance } from "../util/Chance.js";

export class EntityManager {
  // TODO: Entities should be a collection with find methods etc... and the spawn logic should be in a separate class?
  cache: Cache;
  entities: Entities;
  player: Player;
  coordinates: GlobalCoordinates;
  spawners: Spawner<Entity>[];

  constructor(coordinates: GlobalCoordinates) {
    this.cache = new Cache();
    this.player = new Player();
    this.entities = [];
    this.coordinates = coordinates;
    this.spawners = [
      new ArtifactSpawner(),
      new EnemySpawner(),
      new AnomalySpawner(),
    ];

    if (this.coordinates.isOrigin()) this.spawnNPCs();
  }

  getPlayer(): Player {
    return this.player;
  }

  get(entityId: string) {
    return this.entities.find((entity) => entity.id === entityId);
  }

  getAllEntities(): Entity[] {
    return [this.player, ...this.entities];
  }

  remove(entity: Entity) {
    this.entities = this.entities.filter(({ id }) => id !== entity.id);
    this.refreshCache();
  }

  add(entities: Entity | Entities) {
    if (Array.isArray(entities)) {
      this.entities = [...this.entities, ...entities];
    } else {
      this.entities = [...this.entities, entities];
    }

    this.refreshCache();
  }

  spawnEntities() {
    this.reset();

    if (this.isCached()) return this.loadFromCache();

    this.spawners.forEach((spawner) => {
      Chance.withProbability(100, () => {
        const entities = spawner.spawn();
        this.add(entities);
      });
    });
  }

  private refreshCache() {
    const key = this.coordinates.toString();
    this.cache.push(key, this.entities);
  }

  private spawnNPCs() {
    const spawner = new NPCSpawner();
    this.add(spawner.spawn());
  }

  private reset() {
    this.entities = [];
  }

  private loadFromCache() {
    this.entities = this.cache.retrieve(this.coordinates);
  }

  private isCached() {
    return !!this.cache.retrieve(this.coordinates.toString());
  }
}
