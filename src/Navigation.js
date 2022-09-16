export class Navigation {
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

  getAreaCoordinates() {
    const id = this.coordinates.join(",");
    const result = this.areas[id];

    if (!result) this.areas[id] = `${randomInteger(0, 99999)}`;

    return this.areas[id];
  }
}