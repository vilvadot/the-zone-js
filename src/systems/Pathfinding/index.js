import { Debug } from "../../debug.js";
import { AStarPathfinder } from "./AStarPathfinder.js";

export class Pathfinding {
  static run(entities, world) {
    Debug.timeStart("Pathfind");
    for (const {
      id,
      target,
      position,
      velocity,
      keyboardControlled,
    } of entities) {
      if (!target || !position || !velocity || keyboardControlled) continue;

      const targetEntity = entities.find(({ id }) => id === target.id);
      if (!targetEntity) continue;

      const nextStep = AStarPathfinder.calculateNextStep(
        id,
        { x: position.x, y: position.y },
        { x: targetEntity.position.x, y: targetEntity.position.y },
        world
      );

      if (!nextStep) continue;

      velocity.x = nextStep.x - position.x;
      velocity.y = nextStep.y - position.y;
    }
    Debug.timeEnd("Pathfind");
  }
}
