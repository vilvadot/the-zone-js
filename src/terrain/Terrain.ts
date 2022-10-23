import { isBlockingTile } from "../tiles.js";
import { TerrainGenerator } from "./generators/index.js";
import { Matrix } from "../data-structures/Matrix.js";
import { randomInteger } from "../util.js";
import { Cache } from "../Cache.js";

export class Terrain {
  generator: TerrainGenerator;
  data: Matrix;
  cache: Cache;

  constructor(width: number, height: number) {
    this.generator = new TerrainGenerator(width, height);
    this.data = new Matrix(width, height);
    this.cache = new Cache();
  }

  get width() {
    return this.data.columns;
  }

  get height() {
    return this.data.rows;
  }

  generate(seed: string) {
    const cachedTerrain = this.cache.retrieve(seed);
    if (cachedTerrain) return (this.data = cachedTerrain);
    
    this.data = this.generator.setSeed(seed).generate();
    this.cache.push(seed, this.data);
  }

  isBlocked(x: number, y: number) {
    const tile = this.data.getValue(x, y);
    const isOutOfBounds = tile === undefined;
    // console.log({x,y,tile, isOutOfBounds, block: isBlockingTile(tile)})

    if (isOutOfBounds || isBlockingTile(tile)) return true;

    return false;
  }

  getTileAt(x: number, y: number) {
    console.log({x,y})
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
