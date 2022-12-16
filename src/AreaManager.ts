import { Terrain } from "./terrain/index.js";
import { GlobalCoordinates } from "./GlobalCoordinates.js";
import { EntityManager } from "./entities/entity-manager.js";
import { Bus } from "./infra/bus.js";
import { EVENTS } from "./events.js";
import { BIOME } from "./terrain/Terrain.js";
import { randomInteger } from "./util/index.js";
import { Cache } from "./Cache.js";

export class AreaManager {
  bus: Bus;
  terrain: Terrain;
  entityManager: EntityManager;
  coordinates: GlobalCoordinates;
  private areas: Cache;

  constructor(bus: Bus, terrain: Terrain, entityManager: EntityManager) {
    this.bus = bus;
    this.terrain = terrain;
    this.entityManager = entityManager;
    this.areas = new Cache();
    this.coordinates = new GlobalCoordinates();
    this.createNewArea(BIOME.town);
  }

  get currentArea() {
    return {
      id: this.getCurrentAreaId(),
      seed: this.getCurrentAreaSeed(),
      coordinates: this.coordinates,
    };
  }

  createNewArea(biome: BIOME) {
    const seed = this.getCurrentAreaSeed();
    this.areas.push(this.getCurrentAreaId(), seed);
    this.terrain.generate(seed, biome);

    this.bus.emit(EVENTS.AREA_CREATED, { coordinates: this.coordinates });
  }

  handleSubscriptions() {
    this.bus.subscribe(EVENTS.TRAVELED, ({ direction }) => {
      this.coordinates.move(direction);
      this.createNewArea(BIOME.wilderness);
    });
  }
  
  private getCurrentAreaId() {
    return this.coordinates.toString()
  }

  private getCurrentAreaSeed() {
    const id = this.getCurrentAreaId();
    const cachedSeed = this.areas.retrieve(id);

    if (cachedSeed) return cachedSeed;

    return this.generateSeed();
  }

  private generateSeed() {
    return randomInteger(99999);
  }
}
