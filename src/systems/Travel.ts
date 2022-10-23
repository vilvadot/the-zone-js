import { Position, Velocity } from "../components/index.js";
import { HEIGHT, WIDTH } from "../config.js";

export class Travel {
  static run(entities, areaManager) {
    for (const { position, velocity, isPlayer } of entities) {
      if (!isPlayer) continue;

      if (isAtScreenEdge("left", position) && isMoving("left", velocity)) {
        areaManager.travelWest();
        position.x = WIDTH;
      }

      if (isAtScreenEdge("right", position) && isMoving("right", velocity)) {
        areaManager.travelEast();
        position.x = -1;
      }

      if (isAtScreenEdge("bottom", position) && isMoving("down", velocity)) {
        areaManager.travelSouth();
        position.y = -1;
      }

      if (isAtScreenEdge("top", position) && isMoving("up", velocity)) {
        areaManager.travelNorth();
        position.y = HEIGHT;
      }
    }
  }
}

const isMoving = (
  direction: "up" | "down" | "left" | "right",
  velocity: Velocity
) => {
  if (velocity.x === 1 && direction === "right") return true;
  if (velocity.x === -1 && direction === "left") return true;
  if (velocity.y === 1 && direction === "down") return true;
  if (velocity.y === -1 && direction === "up") return true;
  return false;
};

const isAtScreenEdge = (
  edge: "top" | "bottom" | "left" | "right",
  position: Position
) => {
  if (position.x === 0 && edge === "left") return true;
  if (position.x === WIDTH - 1 && edge === "right") return true;
  if (position.y === HEIGHT - 1 && edge === "bottom") return true;
  if (position.y === 0 && edge === "top") return true;
  return false;
};
