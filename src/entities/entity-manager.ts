import { Cache } from "../Cache.js";
import { Corpse } from "./Corpse.js";
import { Player } from "./Player.js";
import { Entities, Entity } from "./index.js";
import { EVENTS } from "../events.js";
import { Bus } from "../infra/bus.js";
import { EnemySpawner } from "../spawners/EnemySpawner.js";
import { ENEMY } from "./enemies/Enemy.js";
import { Spawn } from "../systems/Spawn.js";
import { Terrain } from "../terrain/Terrain.js";

export class EntityManager {
  bus: Bus;
  terrain: Terrain;
  cache: Cache;
  entities: Entities;
  player: Player;

  constructor(bus: Bus, terrain: Terrain) {
    this.terrain = terrain;
    this.bus = bus;
    this.cache = new Cache()
    this.player = new Player();
    this.entities = [];
  }

  getPlayer(): Player {
    return this.player;
  }

  add(entities: Entities) {
    this.entities = [...this.entities, ...entities]
  }

  kill(entity: Entity) {
    this.entities = this.entities.filter(({ id }) => id !== entity.id);
    this.entities.push(new Corpse(entity));
  }

  reset(seed: string) {
    this.cache.push(seed, this.entities)
    this.entities = []
  }


  retrieveAll(seed?: string) {
    if (!seed) return this.getAll();

    if (this.isCached(seed)) {
      this.entities = this.cache.retrieve(seed)
      return this.entities
    }

    return this.getAll();
  }

  handleSubscriptions() {
    this.bus.subscribe(EVENTS.AREA_CREATED, ({coordinates, seed }) => {
      const isHome = coordinates === "0,0"

      if (!this.isCached(coordinates) && !isHome) {
        const enemies = EnemySpawner.spawn(seed, ENEMY.dog);
        this.add(enemies);
      }
      Spawn.run(this.retrieveAll(coordinates), this.terrain);
    })
  }

  private isCached(seed: string) {
    return !!this.cache.retrieve(seed)
  }

  private getAll() {
    return [this.player, ...this.entities]
  }
}


