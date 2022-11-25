import { Coordinate } from "./Coordinate.js";
import { randomInteger } from "./util/index.js";

type AreaSeed = string;
type AreaIndex = string;
type NavigationAreas = Record<AreaIndex, AreaSeed>

export class GlobalCoordinates {
  coordinates: Coordinate;
  areas: NavigationAreas;

  constructor() {
    const INITIAL_SEED = '12345'
    const ORIGIN_INDEX = "0,0"
    this.coordinates = [0, 0];
    this.areas = { [ORIGIN_INDEX]: INITIAL_SEED };
  }

  moveWest() {
    this.coordinates[0]--;
  }

  moveEast() {
    this.coordinates[0]++;
  }

  moveNorth() {
    this.coordinates[1]++;
  }

  moveSouth() {
    this.coordinates[1]--;
  }

  retrieve(){
    return this.coordinates.join(",");
  }

  getAreaSeed() {
    const id = this.retrieve()
    if (!this.areas[id]) this.generateSeed(id)

    return this.areas[id];
  }

  generateSeed(id){
    this.areas[id] = `${randomInteger(99999)}`;
  }
}