import { Cache } from "../Cache.js";
import { Corpse } from "./Corpse.js";
import { Player } from "./Player.js";
import { Entities, Entity } from "./index.js";
import { EVENTS } from "../actions.js";
import { Bus } from "../infra/bus.js";
import { EnemySpawner } from "../spawners/EnemySpawner.js";
import { Terrain } from "../terrain/Terrain.js";
import { GlobalCoordinates } from "../GlobalCoordinates.js";
import { ArtifactSpawner } from "../spawners/ArtifactSpawner.js";
import { Chance } from "../util/index.js";
import { NPCSpawner } from "../spawners/NPCSpawner.js";
import { Debug } from "../infra/debug.js";
import { AnomalySpawner } from "../spawners/AnomalySpawner.js";

export class EntityManager {
  bus: Bus;
  terrain: Terrain;
  cache: Cache;
  entities: Entities;
  player: Player;

  constructor(bus: Bus, terrain: Terrain) {
    this.terrain = terrain;
    this.bus = bus;
    this.cache = new Cache();
    this.player = new Player();
    this.entities = [];
  }

  getPlayer(): Player {
    return this.player;
  }

  get(entityId: string) {
    return this.entities.find(entity => entity.id === entityId)
  }

  getAllEntities(): Entity[] {
    return [this.player, ...this.entities];
  }

  remove(entity: Entity) {
    this.entities = this.entities.filter(({ id }) => id !== entity.id);
  }

  add(entity: Entity) {
    this.entities.push(entity)
  }

  handleSubscriptions() {
    this.bus.subscribe(
      EVENTS.AREA_CREATED,
      ({ area }) => {
        const coordinates = area.coordinates;
        this.reset();

        const isCached = this.isCached(coordinates);
        if (isCached) {
          Debug.log("Entities loaded from cache")
          return this.loadFromCache(coordinates)
        };

        this.spawnNPCs(coordinates);
        this.spawnEnemies(coordinates);
        this.spawnArtifacts(coordinates);
        this.spawnAnomalies(coordinates);
      }
    );
  }

  private addMultiple(entities: Entities, coordinates: GlobalCoordinates) {
    this.entities = [...this.entities, ...entities];
    this.cache.push(coordinates.toString(), this.entities);
  }

  private spawnArtifacts(coordinates: GlobalCoordinates) {
    if (coordinates.isOrigin()) return;

    Chance.withProbability(100, () => {
      const artifacts = ArtifactSpawner.spawn(1);

      this.addMultiple(artifacts, coordinates);
    });
  }

  private spawnAnomalies(coordinates: GlobalCoordinates) {
    if (coordinates.isOrigin()) return;

    Chance.withProbability(100, () => {
      const artifacts = AnomalySpawner.spawn();

      this.addMultiple(artifacts, coordinates);
    });
  }

  private spawnEnemies(coordinates: GlobalCoordinates) {
    if (coordinates.isOrigin()) return;

    Chance.withProbability(100, () => {
      const enemySeed = `${coordinates.x + coordinates.y}${coordinates.y}`;
      const enemies = EnemySpawner.spawn(enemySeed);

      this.addMultiple(enemies, coordinates);
    });
  }

  private spawnNPCs(coordinates: GlobalCoordinates) {
    if (!coordinates.isOrigin()) return;

    this.addMultiple(NPCSpawner.spawn(), coordinates);
  }

  private reset() {
    this.entities = [];
  }

  private loadFromCache(coordinates: GlobalCoordinates) {
    this.entities = this.cache.retrieve(coordinates);
  }

  private isCached(coordinates: GlobalCoordinates) {
    return !!this.cache.retrieve(coordinates.toString());
  }
}
