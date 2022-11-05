import { Coordinate } from "../../Coordinate.js";
import ROT from '../../lib/rot.js'

export class AStarPathfinder {
  static calculateNextStep(id, origin, target, terrain) {
    const path: Coordinate[] = [];

    const checkFreeCell = (x, y) => {
      const isFree = !terrain.isBlocked(x, y);
      return isFree;
    };
    const engine = new ROT.Path.AStar(target.x, target.y, checkFreeCell, {
      topology: 4,
    });

    engine.compute(origin.x, origin.y, (x, y) => {
      const position: Coordinate = [x, y]
      path.push(position);
    });

    const firstPathStep = path[1];
    if (!firstPathStep)
      return;

    return { x: firstPathStep[0], y: firstPathStep[1] };
  }
}
