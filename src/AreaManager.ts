import { Terrain } from "./terrain/index.js";
import { GlobalCoordinates } from "./Navigation.js";
import { EntityManager } from "./entities/entity-manager.js";
import { Bus } from "./infra/bus.js";
import { EVENTS } from "./events.js";
import { BIOME } from "./terrain/Terrain.js";

export class AreaManager {
  bus: Bus;
  terrain: Terrain;
  entityManager: EntityManager;
  coordinates: GlobalCoordinates;

  constructor(bus: Bus, terrain: Terrain, entityManager: EntityManager) {
    this.bus = bus;
    this.terrain = terrain;
    this.entityManager = entityManager;
    this.coordinates = new GlobalCoordinates();
    this.createNewArea(BIOME.town);
  }

  getCurrentArea() {
    return this.coordinates.toString();
  }

  createNewArea(biome: BIOME) {
    const coordinates = this.coordinates;
    const seed = this.coordinates.getAreaSeed();
    this.terrain.generate(seed, biome);
    this.bus.emit(EVENTS.AREA_CREATED, { coordinates });
  }

  handleSubscriptions() {
    this.bus.subscribe(EVENTS.TRAVELED, ({ direction }) => {
      if (direction === "north") this.coordinates.moveNorth();
      if (direction === "east") this.coordinates.moveEast();
      if (direction === "west") this.coordinates.moveWest();
      if (direction === "south") this.coordinates.moveSouth();

      this.createNewArea(BIOME.wilderness);
    });
  }
}
