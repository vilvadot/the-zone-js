import { TILES } from "../../tiles.js";
import { MatrixArea } from "../../data-structures/MatrixArea.js";

export class BuildingGenerator {
  run(result) {
    const start = [5, 5];
    const end = [10, 10];

    const building = MatrixArea.from(start, end, TILES.plank);

    building
      .getBorder(1)
      .iterate((x, y) => {
        building.setValue(x, y, TILES.woodWall);
      });

    result.merge(building);

    return result;
  }
}
