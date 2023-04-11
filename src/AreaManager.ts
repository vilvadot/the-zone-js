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
  terrain: Terrain;
  coordinates: GlobalCoordinates;
  private areas: Cache;

  constructor(terrain: Terrain, coordinates: GlobalCoordinates) {
    this.terrain = terrain;
    this.areas = new Cache();
    this.coordinates = coordinates;

    this.createInitialArea()
  }

  createNewArea(biome: BIOME = BIOME.wilderness) {
    const seed = this.getCurrentAreaSeed();
    this.areas.push(this.getCurrentAreaId(), seed);
    this.terrain.generate(seed, biome);
  }

  private createInitialArea() {
    if(this.coordinates.isOrigin()) return this.createNewArea(BIOME.town);
    this.createNewArea(BIOME.wilderness)
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
