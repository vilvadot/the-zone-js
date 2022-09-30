import { Position, TargetManual, Velocity } from "../../components";
import { Pathfinding } from "./index";

describe("Pathfinding system", () => {
  const terrain = {
        isBlocked: () => false
    }

  it("accelerates follower towards target", () => {
    const targetId = "runner";
    const follower = new Entity(
      "enemy",
      new Position(0, 0),
      new TargetManual(targetId)
    );
    const target = new Entity(targetId, new Position(2, 2));

    Pathfinding.run([target, follower], terrain);

    expect(follower.velocity.x).toEqual(1);
    expect(follower.velocity.y).toEqual(0);
  });

  it("ignores keyboard controlled entities", () => {
    const targetId = "runner";
    const follower = new KeyboardControlledEntity(
      "enemy",
      new Position(0, 0),
      new TargetManual(targetId)
    );
    const target = new Entity(targetId, new Position(2, 2));

    Pathfinding.run([target, follower], terrain);

    expect(follower.velocity.x).toEqual(0);
    expect(follower.velocity.y).toEqual(0);
  });
});

class KeyboardControlledEntity {
  constructor(id, position, target) {
    this.id = id;
    this.target = target;
    this.position = position;
    this.velocity = new Velocity(0, 0);
    this.keyboardControlled = true;
  }
}

class Entity {
  constructor(id, position, target) {
    this.id = id;
    this.target = target;
    this.position = position;
    this.velocity = new Velocity(0, 0);
  }
}
