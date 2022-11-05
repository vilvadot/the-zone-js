import { TILES } from "../../tiles.js";
import { MatrixArea } from "../../data-structures/MatrixArea.js";
import { randomInteger } from "../../util/index.js";
import { HEIGHT, WIDTH } from "../../config.js";
import { Matrix } from "../../data-structures/Matrix.js";
import { Coordinate } from "../../Coordinate.js";

export class BuildingGenerator {
  run(result: Matrix) {
    const size = randomInteger(2,6)
    const start: Coordinate = [randomInteger(WIDTH - size), randomInteger(HEIGHT - size)]
    const end: Coordinate = [start[0] + size, start[1] + size];

    const building = MatrixArea.from(start, end, TILES.plank);

    building
      .getBorder(1)
      .iterate((x, y) => {
        building.setValue(x, y, TILES.woodWall);
      });

    result.mergeAt(building, start);

    return result;
  }
}
