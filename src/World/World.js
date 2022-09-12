import { TILES } from "../tiles.js";
import { randomInteger } from "../util.js";

export class World {
  constructor(bus, display, map, generator) {
    this.bus = bus;
    this.display = display;
    this.map = map;
    this.generator = generator;
    this.currentArea = [0, 0];
    this.areas = {
      "0,0": "1233",
    };
  }

  get width() {
    return this.map.width;
  }

  get height() {
    return this.map.height;
  }

  travelWest() {
    this.currentArea[0]--;
    this.generate()
  }

  travelEast() {
    this.currentArea[0]++;
    this.generate()
  }

  travelNorth() {
    this.currentArea[1]++;
    this.generate()
  }

  travelSouth() {
    this.currentArea[1]--;
    this.generate()
  }

  _getCurrentArea() {
    const id = this.currentArea.join(",");
    const result = this.areas[id];

    if (!result) this.areas[id] = `${randomInteger(0, 99999)}`;

    return this.areas[id];
  }

  generate() {
    const seed = this._getCurrentArea();

    this.generator
    .setSeed(seed)
    .generate((x, y, isFilled) => {
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
