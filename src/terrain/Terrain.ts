import { isBlockingTile } from "../tiles.js";
import { WilderNessGenerator } from "./generators/WilderNessGenerator.js";
import { TerrainGenerator } from "./generators/TerrainGenerator.js";
import { Matrix } from "../data-structures/Matrix.js";
import { randomInteger } from "../util/index.js";
import { Cache } from "../Cache.js";

export class Terrain {
  generator: TerrainGenerator;
  data: Matrix;
  cache: Cache;

  constructor(width: number, height: number) {
    this.data = new Matrix(width, height);
    this.cache = new Cache();
    this.generator = new WilderNessGenerator(width, height);
  }

  get width() {
    return this.data.rows;
  }

  get height() {
    return this.data.columns;
  }

  generate(seed: string, areaType: string = "wilderness") {
    if(areaType === "town"){
      console.log('Generating a town!')
      this.generator = new WilderNessGenerator(this.width, this.height)
    }
    const cachedTerrain = this.cache.retrieve(seed);
    if (cachedTerrain) return (this.data = cachedTerrain);
    
    this.data = this.generator.setSeed(seed).generate();
    this.cache.push(seed, this.data);
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
