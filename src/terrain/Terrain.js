import { TILES, isBlockingTile } from "../tiles.js";
import { Generator } from "./Generator.js";
import { Matrix } from "../data-structures/Matrix.js";
import { randomInteger } from "../util.js";

export class Terrain {
  constructor(width, height) {
    this.generator = new Generator(width, height);
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

    const isWall = tile === TILES.wall;
    return isWall;
  }

  getTileAt(x, y) {
    const tile = this.data.getValue(x, y);
    return tile;
  }

  getRandomFreeCell() {
    let tries = 0;
    let x;
    let y;

    while (tries < 10) {
      x = randomInteger(0, this.width);
      y = randomInteger(0, this.height);

      if (this.isBlocked(x, y)) {
        tries++;
      } else {
        break;
      }
    }

    return { x, y, value: this.data.getValue(x, y) };
  }
}
