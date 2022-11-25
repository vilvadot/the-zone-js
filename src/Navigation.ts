import { randomInteger } from "./util/index.js";

type AreaSeed = string;
type AreaIndex = string;
type NavigationAreas = Record<AreaIndex, AreaSeed>

export class Coordinates{
  x: number;
  y: number;

  constructor(x: number, y: number){
    this.x = x;
    this.y = y;
  }
  
  toString(){
    return `${this.x},${this.y}`
  }

  isHome(){
    return this.x === 0 && this.y === 0;
  }
}

export class GlobalCoordinates {
  coordinates: Coordinates;
  areas: NavigationAreas;

  constructor() {
    const INITIAL_SEED = '12345'
    const ORIGIN_INDEX = "0,0"
    this.coordinates = new Coordinates(0,0);
    this.areas = { [ORIGIN_INDEX]: INITIAL_SEED };
  }

  moveWest() {
    this.coordinates.x--;
  }

  moveEast() {
    this.coordinates.x++;
  }

  moveNorth() {
    this.coordinates.y++;
  }

  moveSouth() {
    this.coordinates.y--;
  }

  retrieve(){
    return this.coordinates;
  }

  getAreaSeed() {
    const id = this.retrieve().toString()
    if (!this.areas[id]) this.generateSeed(id)

    return this.areas[id];
  }

  generateSeed(id){
    this.areas[id] = `${randomInteger(99999)}`;
  }
}