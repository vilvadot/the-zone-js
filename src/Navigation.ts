import { Coordinate } from "./Coordinate.js";
import { randomInteger } from "./util.js";

type AreaSeed = string;
type AreaIndex = string;
type NavigationAreas = Record<AreaIndex, AreaSeed>

export class Navigation {
  coordinates: Coordinate;
  areas: NavigationAreas;

  constructor() {
    const INITIAL_SEED = '12345'
    const ORIGIN_INDEX = "0,0"
    this.coordinates = [0, 0];
    this.areas = { [ORIGIN_INDEX]: INITIAL_SEED };
  }

  travelWest() {
    this.coordinates[0]--;
  }

  travelEast() {
    this.coordinates[0]++;
  }

  travelNorth() {
    this.coordinates[1]++;
  }

  travelSouth() {
    this.coordinates[1]--;
  }

  getAreaCoordinates(){
    return this.coordinates.join(",");
  }

  getAreaSeed() {
    const id = this.getAreaCoordinates()
    if (!this.areas[id]) this.generateSeed(id)

    return this.areas[id];
  }

  generateSeed(id){
    this.areas[id] = `${randomInteger(99999)}`;
  }
}