export enum DIRECTION {
  north = "north",
  south = "south",
  east = "east",
  west = "west",
}

export class GlobalCoordinates {
  x: number;
  y: number;

  constructor(x = 0, y = 0) {
    this.x = x;
    this.y = y;
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
}
