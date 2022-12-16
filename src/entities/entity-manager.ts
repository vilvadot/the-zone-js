import { Cache } from "../Cache.js";
import { Corpse } from "./Corpse.js";
import { Player } from "./Player.js";
import { Entities, Entity } from "./index.js";
import { AREA_CREATED_PAYLOAD, EVENTS } from "../events.js";
import { Bus } from "../infra/bus.js";
import { EnemySpawner } from "../spawners/EnemySpawner.js";
import { Terrain } from "../terrain/Terrain.js";
import { GlobalCoordinates } from "../GlobalCoordinates.js";
import { ArtifactSpawner } from "../spawners/ArtifactSpawner.js";
import { Chance } from "../util/index.js";

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

  getAllEntities(): Entity[] {
    return [this.player, ...this.entities];
  }

  kill(entity: Entity) {
    this.entities = this.entities.filter(({ id }) => id !== entity.id);
    this.entities.push(new Corpse(entity));
  }

  handleSubscriptions() {
    this.bus.subscribe(
      EVENTS.AREA_CREATED,
      ({ area }: AREA_CREATED_PAYLOAD) => {
        const coordinates = area.coordinates;
        this.reset();

        if (coordinates.isOrigin()) return;

        const isCached = this.isCached(coordinates);
        if (isCached) return this.loadFromCache(coordinates);

        this.spawnEnemies(coordinates);
        this.spawnArtifacts(coordinates);
      }
    );
  }

  private add(entities: Entities, coordinates: GlobalCoordinates) {
    this.entities = [...this.entities, ...entities];
    this.cache.push(coordinates.toString(), this.entities);
  }

  private spawnArtifacts(coordinates: GlobalCoordinates) {
    Chance.withProbability(15, () => {
      const artifacts = ArtifactSpawner.spawn(1);

      this.add(artifacts, coordinates);
    });
  }

  private spawnEnemies(coordinates: GlobalCoordinates) {
    Chance.withProbability(100, () => {
      const enemySeed = `${coordinates.x + coordinates.y}${coordinates.y}`;
      const enemies = EnemySpawner.spawn(enemySeed);

      this.add(enemies, coordinates);
    });
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
