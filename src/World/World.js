import { TILES } from "../tiles.js";
import { Generator } from "./Generator.js";
import { Grid } from "./Grid.js";

export class World {
  constructor(width, height) {
    this.generator = new Generator(width - 1, height - 1);
    this.map = new Grid(width, height);
  }

  get width() {
    return this.map.width;
  }

  get height() {
    return this.map.height;
  }

  generate(seed) {
    this.generator.setSeed(seed).generate((x, y, isFilled) => {
      const tile = isFilled ? TILES.wall : TILES.empty;
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

    const isFree = tile === TILES.empty;
    return !isFree;
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
