import { Cache } from "../data-structures/Cache.js";
import { Player } from "./Player.js";
import { Entities, Entity } from "./index.js";
import { EVENTS } from "../actions.js";
import { Bus } from "../infra/bus.js";
import { EnemySpawner } from "../spawners/EnemySpawner.js";
import { GlobalCoordinates } from "../GlobalCoordinates.js";
import { ArtifactSpawner } from "../spawners/ArtifactSpawner.js";
import { Chance } from "../util/index.js";
import { NPCSpawner } from "../spawners/NPCSpawner.js";
import { Debug } from "../infra/debug.js";
import { AnomalySpawner } from "../spawners/AnomalySpawner.js";

export class EntityManager {
  bus: Bus;
  cache: Cache;
  entities: Entities;
  player: Player;
  coordinates: GlobalCoordinates;

  constructor(bus: Bus, coordinates: GlobalCoordinates) {
    this.bus = bus;
    this.cache = new Cache();
    this.player = new Player();
    this.entities = [];
    this.coordinates =  coordinates;
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
    this.refreshCache()
  }

  add(entities: Entity | Entities) {
    if(Array.isArray(entities)) {
      this.entities = [...this.entities, ...entities];
    }else{
      this.entities = [...this.entities, entities];
    }

    this.refreshCache()
  }

  handleSubscriptions() {
    this.bus.subscribe(EVENTS.AREA_CREATED, () => {
      this.reset();

      const isCached = this.isCached();
      if (isCached) {
        Debug.log("Entities loaded from cache");
        return this.loadFromCache();
      }

      if (this.coordinates.isOrigin()) {
        this.spawnNPCs();
      }else{
        this.spawnEnemies();
        this.spawnArtifacts();
        this.spawnAnomalies();
      }
    });
  }

  private refreshCache() {
    const key = this.coordinates.toString();
    this.cache.push(key, this.entities);
  }

  private spawnArtifacts() {
    Chance.withProbability(100, () => {
      const artifacts = ArtifactSpawner.spawn(1);

      this.add(artifacts)
    });
  }

  private spawnAnomalies() {
    Chance.withProbability(100, () => {
      const artifacts = AnomalySpawner.spawn();

      this.add(artifacts);
    });
  }

  private spawnEnemies() {
    Chance.withProbability(100, () => {
      const enemySeed = `${this.coordinates.x + this.coordinates.y}${this.coordinates.y}`;
      const enemies = EnemySpawner.spawn(enemySeed);

      this.add(enemies);
    });
  }

  private spawnNPCs() {
    this.add(NPCSpawner.spawn());
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
