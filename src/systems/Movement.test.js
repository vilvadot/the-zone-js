import { Position, Velocity } from "../components";
import { Movement } from "./Movement";

describe("Movement system", () => {
  it("moves entity according to its velocity", () => {
    const world = {
        isBlocked: () => false
    }
    const entity = new Entity(new Position(0,0), new Velocity(0, 1));

    Movement.run([entity], world);

    expect(entity.position.x).toEqual(0);
    expect(entity.position.y).toEqual(1);
  });

  it("resets velocity after moving", () => {
    const world = {
        isBlocked: () => false
    }
    const entity = new Entity(new Position(0,0), new Velocity(0, 1));

    Movement.run([entity], world);

    expect(entity.velocity.x).toEqual(0);
    expect(entity.velocity.y).toEqual(0);
  });

  it("wont move if tile is blocked", () => {
    const world = {
        isBlocked: () => true
    }
    const entity = new Entity(new Position(0,0), new Velocity(0, 1));

    Movement.run([entity], world);

    expect(entity.position.x).toEqual(0);
    expect(entity.position.y).toEqual(0);
  });

  it("wont move if tile is occupied by another entity", () => {
    const world = {
        isBlocked: () => false
    }
    const entity = new Entity(new Position(0,0), new Velocity(0, 1));
    const blocker = new Entity(new Position(0,1), new Velocity(0, 0));

    Movement.run([entity, blocker], world);

    expect(entity.position.x).toEqual(0);
    expect(entity.position.y).toEqual(0);
  });
});

class Entity {
  constructor(position, velocity ) {
    this.position = position;
    this.velocity = velocity;
  }
}
