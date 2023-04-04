import { Terrain } from "./terrain/index.js";
import { GlobalCoordinates } from "./GlobalCoordinates.js";
import { Bus } from "./infra/bus.js";
import { EVENTS } from "./actions.js";
import { BIOME } from "./terrain/Terrain.js";
import { randomInteger } from "./util/index.js";
import { Cache } from "./data-structures/Cache.js";
import { Debug } from "./infra/debug.js";

export interface Area {
  id: string;
  seed: string;
  coordinates: GlobalCoordinates;
}

export class AreaManager {
  bus: Bus;
  terrain: Terrain;
  coordinates: GlobalCoordinates;
  private areas: Cache;

  constructor(bus: Bus, terrain: Terrain) {
    this.bus = bus;
    this.terrain = terrain;
    this.areas = new Cache();
    this.coordinates = new GlobalCoordinates();
  }

  createNewArea(biome: BIOME) {
    const seed = this.getCurrentAreaSeed();
    this.areas.push(this.getCurrentAreaId(), seed);
    this.terrain.generate(seed, biome);

    this.bus.emit(EVENTS.AREA_CREATED, {
      area: this.currentArea,
    });
  }

  handleSubscriptions() {
    this.createNewArea(BIOME.town); // TODO: Remove this. Makes no sense here

    this.bus.subscribe(EVENTS.TRAVELED, ({ direction }) => {
      this.coordinates.move(direction);
      this.createNewArea(BIOME.wilderness);
    });
  }

  getCurrentCoordinates() {
    return this.coordinates;
  }

  private get currentArea(): Area {
    return {
      id: this.getCurrentAreaId(),
      seed: this.getCurrentAreaSeed(),
      coordinates: this.coordinates,
    };
  }

  private getCurrentAreaId() {
    return this.coordinates.toString();
  }

  private getCurrentAreaSeed() {
    const id = this.getCurrentAreaId();
    const cachedSeed = this.areas.retrieve(id);

    if (cachedSeed) {
      Debug.log(`Recovering cached area: ${id}. seed: ${cachedSeed}`);
      return cachedSeed;
    }

    return this.generateSeed();
  }

  private generateSeed() {
    return randomInteger(99999);
  }
}
