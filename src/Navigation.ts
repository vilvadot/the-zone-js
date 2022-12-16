import { randomInteger } from "./util/index.js";

type AreaSeed = string;
type AreaIndex = string;
type NavigationAreas = Record<AreaIndex, AreaSeed>;

enum DIRECTION {
  north = "north",
  south = "south",
  east = "east",
  west = "west",
}

export class GlobalCoordinates {
  x: number;
  y: number;
  private areas: NavigationAreas;

  constructor(x = 0, y = 0) {
    const INITIAL_SEED = "12345";
    const ORIGIN_INDEX = "0,0";
    this.x = x;
    this.y = y;
    this.areas = { [ORIGIN_INDEX]: INITIAL_SEED };
  }

  isOrigin() {
    return this.x === 0 && this.y === 0;
  }

  toString() {
    return `${this.x},${this.y}`;
  }

  move(direction: DIRECTION) {
    if (direction === DIRECTION.north) this.y++;
    if (direction === DIRECTION.east) this.x++;
    if (direction === DIRECTION.west) this.x--;
    if (direction === DIRECTION.south) this.y--;
  }

  getAreaSeed() {
    const id = this.toString();
    if (!this.areas[id]) this.generateSeed(id);

    return this.areas[id];
  }

  generateSeed(id) {
    this.areas[id] = `${randomInteger(99999)}`;
  }
}
