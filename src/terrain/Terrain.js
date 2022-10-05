import { isBlockingTile } from "../tiles.js";
import { TerrainGenerator } from "./generators/index.js";
import { Matrix } from "../data-structures/Matrix.js";
import { randomInteger } from "../util.js";

export class Terrain {
  constructor(width, height) {
    this.generator = new TerrainGenerator(width, height);
    this.data = new Matrix(width, height);
  }

  get width() {
    return this.data.columns;
  }

  get height() {
    return this.data.rows;
  }

  generate(seed) {
    this.data = this.generator.setSeed(seed).generate();
  }

  isBlocked(x, y) {
    const tile = this.data.getValue(x, y);
    const isOutOfBounds = tile === undefined;
    
    if (isOutOfBounds || isBlockingTile(tile)) return true;

    return false;
  }

  getTileAt(x, y) {
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
