import { TILES } from "../tiles.js";
import { Generator } from "./Generator.js";
import { Cells } from "./Cells.js";

export class World {
  constructor(width, height) {
    this.generator = new Generator(width, height);
    this.map = new Cells(width, height);
  }

  get width() {
    return this.map.width;
  }

  get height() {
    return this.map.height;
  }

  generate(seed) {
    this.generator.setSeed(seed).generate((x, y, tile) => {
      this.map.add(x, y, tile);
    });
  }

  addWall(x, y) {
    this.map.add(x, y, TILES.wall);
    return this;
  }

  getCenter() {
    return {
      x: Math.floor(this.width / 2),
      y: Math.floor(this.height / 2),
    };
  }

  isBlocked(x, y) {
    const tile = this.map.getTile(x, y);
    if (!tile) return true;

    const isWall = tile === TILES.wall;
    return isWall;
  }

  getTileAt(x, y) {
    const tile = this.map.getTile(x, y);
    return tile;
  }

  getRandomFreeCell() {
    let tile = this.map.getRandomCellCoordinates();
    if (this.isBlocked(tile.x, tile.y)) return this.getRandomFreeCell();
    return tile;
  }
}
