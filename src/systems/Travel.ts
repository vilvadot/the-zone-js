import { Position, Velocity } from "../components/index.js";
import { HEIGHT, WIDTH } from "../config.js";
import { Entities } from "../entities/index.js";
import { EVENTS } from "../actions.js";
import { Bus } from "../infra/bus.js";

export class Travel {
  static run(entities: Entities, bus: Bus) {
    for (const { position, velocity, isPlayer } of entities) {
      if (!isPlayer) continue;

      if (isAtScreenEdge("left", position) && isMoving("left", velocity)) {
        bus.emit(EVENTS.TRAVELED, { direction: "west" });
        position.x = WIDTH;
      }

      if (isAtScreenEdge("right", position) && isMoving("right", velocity)) {
        bus.emit(EVENTS.TRAVELED, { direction: "east" });
        position.x = -1;
      }

      if (isAtScreenEdge("bottom", position) && isMoving("down", velocity)) {
        bus.emit(EVENTS.TRAVELED, { direction: "south" });
        position.y = -1;
      }

      if (isAtScreenEdge("top", position) && isMoving("up", velocity)) {
        bus.emit(EVENTS.TRAVELED, { direction: "north" });
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
