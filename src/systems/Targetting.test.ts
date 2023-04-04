import { describe, expect, it, beforeEach } from "vitest";
import { Position, TargetManual, Collision } from "../components/index.js";
import { Targetting } from "./Targetting.js";
import { ACTION_NAME } from "../actions.js";

describe("Targetting system", () => {
  it("respects hardcoded targets", () => {
    const targetId = "victim";
    const attacker = new Attacker();

    Targetting.run([attacker]);

    expect(attacker.target.id).toEqual(targetId);
  });

  it("targets entity to the east if ArrowRight is pressed", () => {
    const attacker = new Attacker({ east: ["east-id"] });

    Targetting.run([attacker], aMoveAction("east"));

    expect(attacker.target.id).toEqual("east-id");
  });

  it("targets entity to the west if ArrowLeft is pressed", () => {
    const attacker = new Attacker({ west: ["west-id"] });

    Targetting.run([attacker], aMoveAction("west"));

    expect(attacker.target.id).toEqual("west-id");
  });

  it("targets entity to the north if ArrowUp is pressed", () => {
    const attacker = new Attacker({ north: ["north-id"] });

    Targetting.run([attacker], aMoveAction("north"));

    expect(attacker.target.id).toEqual("north-id");
  });

  it("targets entity to the south if ArrowUp is pressed", () => {
    const attacker = new Attacker({ south: ["south-id"] });

    Targetting.run([attacker], aMoveAction("south"));

    expect(attacker.target.id).toEqual("south-id");
  });
});

class Attacker {
  target: TargetManual;
  id: string;
  position: Position;
  collision: Collision;

  constructor(collisionAreas?) {
    this.id = "attacker";
    this.target = new TargetManual("victim");
    this.position = new Position(0, 0);
    this.collision = new Collision(collisionAreas);
  }
}

const aMoveAction = (direction) => {
  return { name: ACTION_NAME.MOVE, payload: { direction } };
};
