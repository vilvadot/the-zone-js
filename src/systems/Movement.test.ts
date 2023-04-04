import { describe, expect, it, vi } from "vitest";
import { Position, Velocity } from "../components/index.js";
import { Terrain } from "../terrain/Terrain.js";
import { Movement } from "./Movement.js";

describe("Movement system", () => {
  it("moves entity according to its velocity", () => {
    const terrain = stubTerrainNeverBlocked();
    const entity = new Entity(new Position(0, 0), new Velocity(0, 1));

    Movement.run([entity], terrain);

    expect(entity.position.x).toEqual(0);
    expect(entity.position.y).toEqual(1);
  });

  it("resets velocity after moving", () => {
    const terrain = stubTerrainNeverBlocked();
    const entity = new Entity(new Position(0, 0), new Velocity(0, 1));

    Movement.run([entity], terrain);

    expect(entity.velocity.x).toEqual(0);
    expect(entity.velocity.y).toEqual(0);
  });

  it("wont move if tile is blocked", () => {
    const terrain = stubTerrainAlwaysBlocked();
    const entity = new Entity(new Position(0, 0), new Velocity(0, 1));

    Movement.run([entity], terrain);

    expect(entity.position.x).toEqual(0);
    expect(entity.position.y).toEqual(0);
  });

  it("wont move if tile is occupied by another entity", () => {
    const terrain = stubTerrainNeverBlocked();
    const entity = new Entity(new Position(0, 0), new Velocity(0, 1));
    const blocker = new Entity(new Position(0, 1), new Velocity(0, 0));

    Movement.run([entity, blocker], terrain);

    expect(entity.position.x).toEqual(0);
    expect(entity.position.y).toEqual(0);
  });
});

const stubTerrainAlwaysBlocked = () => {
  const terrain = new Terrain(10, 10);
  terrain.isBlocked = vi.fn().mockReturnValue(true);

  return terrain;
};

const stubTerrainNeverBlocked = () => {
  const terrain = new Terrain(10, 10);
  terrain.isBlocked = vi.fn().mockReturnValue(false);

  return terrain;
};

class Entity {
  position: Position;
  velocity: Velocity;

  constructor(position, velocity) {
    this.position = position;
    this.velocity = velocity;
  }
}
