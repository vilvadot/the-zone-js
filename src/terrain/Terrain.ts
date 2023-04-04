import { isBlockingTile } from "../tiles.js";
import { WilderNessGenerator } from "./generators/WilderNessGenerator.js";
import { TerrainGenerator } from "./generators/TerrainGenerator.js";
import { Matrix } from "../data-structures/Matrix.js";
import { randomInteger } from "../util/index.js";
import { Cache } from "../Cache.js";
import { TownGenerator } from "./generators/TownGenerator.js";

export enum BIOME {
  town = "town",
  wilderness = "wilderness",
}

export class Terrain {
  data: Matrix;
  cache: Cache;

  constructor(width: number, height: number) {
    this.data = new Matrix(width, height);
    this.cache = new Cache();
  }

  get width() {
    return this.data.rows;
  }

  get height() {
    return this.data.columns;
  }

  generate(seed: string, biome: string = "wilderness") {
    const cachedTerrain = this.cache.retrieve(seed);
    if (cachedTerrain) return (this.data = cachedTerrain);

    this.data = this.chooseGenerator(biome, seed).generate();
    this.cache.push(seed, this.data);
  }

  chooseGenerator(biome: string, seed: string) {
    const GENERATORS = {
      [BIOME.town]: new TownGenerator(this.width, this.height),
      [BIOME.wilderness]: new WilderNessGenerator(this.width, this.height),
    };

    return GENERATORS[biome].withSeed(seed);
  }

  isBlocked(x: number, y: number) {
    const tile = this.data.getValue(x, y);
    const isOutOfBounds = tile === undefined;

    if (isOutOfBounds || isBlockingTile(tile)) return true;

    return false;
  }

  getTileAt(x: number, y: number) {
    const tile = this.data.getValue(x, y);
    return tile;
  }

  getRandomFreeCoordinate() {
    let tries = 0;
    let x;
    let y;

    while (tries < 10) {
      x = randomInteger(this.width);
      y = randomInteger(this.height);

      if (this.isBlocked(x, y)) {
        tries++;
      } else {
        break;
      }
    }

    return { x, y };
  }
}
