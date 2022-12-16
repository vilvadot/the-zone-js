import { TILES } from "../../../tiles.js";
import { MatrixArea } from "../../../data-structures/MatrixArea.js";
import { Matrix } from "../../../data-structures/Matrix.js";
import { Coordinate } from "../../../Coordinate.js";
import { Chance } from "../../../util/Chance.js";
import { pickRandom, roll } from "../../../util/random.js";

export class GenerateBuildings {
  run(result: Matrix) {
    const buildings = [
      createBuilding([1, 1], [5, 5]),
      createBuilding([11, 11], [15, 15]),
      createBuilding([30, 6], [36, 12]),
      createBuilding([16, 2], [26, 6]),
    ];

    buildings.forEach(({ start, tiles }) => result.mergeAt(tiles, start));

    return result;
  }
}

const createBuilding = (start: Coordinate, end: Coordinate) => {
  // Inside here all references are relative to 0,0 being the origin of coordinates of the building
  const length = end[0] - start[0];
  const height = end[1] - start[1];
  const building = MatrixArea.from([0, 0], [length, height], TILES.plank);

  const walls = building.getBorder(1);

  walls.iterate((x, y) => {
    building.setValue(x, y, TILES.woodWall);
  });

  building.setValue(length / 2, height, TILES.empty);

  return { start, tiles: building };
};
