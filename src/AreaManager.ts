import { Terrain } from "./terrain/index.js";
import { GlobalCoordinates } from "./GlobalCoordinates.js";
import { EntityManager } from "./entities/entity-manager.js";
import { Bus } from "./infra/bus.js";
import { EVENTS } from "./events.js";
import { BIOME } from "./terrain/Terrain.js";
import { randomInteger } from "./util/index.js";

type AreaSeed = string;
type AreaIndex = string;
type NavigationAreas = Record<AreaIndex, AreaSeed>;

export class AreaManager {
  bus: Bus;
  terrain: Terrain;
  entityManager: EntityManager;
  coordinates: GlobalCoordinates;
  private areas: NavigationAreas;

  constructor(bus: Bus, terrain: Terrain, entityManager: EntityManager) {
    const INITIAL_SEED = "12345";
    const ORIGIN_INDEX = "0,0";
    this.areas = { [ORIGIN_INDEX]: INITIAL_SEED };
    this.bus = bus;
    this.terrain = terrain;
    this.entityManager = entityManager;
    this.coordinates = new GlobalCoordinates();
    this.createNewArea(BIOME.town);
  }

  getCurrentArea() {
    return this.coordinates;
  }

  getAreaSeed() {
    const id = this.coordinates.toString();
    if (!this.areas[id]) this.generateSeed(id);

    return this.areas[id];
  }

  private generateSeed(id) {
    this.areas[id] = `${randomInteger(99999)}`;
  }

  createNewArea(biome: BIOME) {
    const coordinates = this.coordinates;
    const seed = this.getAreaSeed();
    this.terrain.generate(seed, biome);
    this.bus.emit(EVENTS.AREA_CREATED, { coordinates });
  }

  handleSubscriptions() {
    this.bus.subscribe(EVENTS.TRAVELED, ({ direction }) => {
    this.coordinates.move(direction)

      this.createNewArea(BIOME.wilderness);
    });
  }
}
