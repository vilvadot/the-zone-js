import { describe, expect, it, beforeEach } from "vitest";
import { Collision as CollisionSystem } from "../systems/index.js";
import { Position, Collision } from "../components/index.js";

describe("Collision system", () => {
  it("ignores itself", () => {
    const anEntity = new Entity("origin-id", 0, 0);

    CollisionSystem.run([anEntity]);

    expect(anEntity.collision.areas.overlap).not.toContain(anEntity.id);
  });

  it("registers entities that are adjacent to the west", () => {
    const anEntity = new Entity("origin-id", 0, 0);
    const west = new Entity("west-id", -1, 0);

    CollisionSystem.run([anEntity, west]);

    expect(anEntity.collision.areas.west).toContain(west.id);
  });

  it("registers entities that are adjacent to the east", () => {
    const anEntity = new Entity("origin-id", 0, 0);
    const east = new Entity("east-id", 1, 0);

    CollisionSystem.run([anEntity, east]);

    expect(anEntity.collision.areas.east).toContain(east.id);
  });

  it("registers entities that are adjacent to the north", () => {
    const anEntity = new Entity("origin-id", 0, 0);
    const north = new Entity("north-id", 0, -1);

    CollisionSystem.run([anEntity, north]);

    expect(anEntity.collision.areas.north).toContain(north.id);
  });

  it("registers entities that are adjacent to the south", () => {
    const anEntity = new Entity("origin-id", 0, 0);
    const south = new Entity("south-id", 0, 1);

    CollisionSystem.run([anEntity, south]);

    expect(anEntity.collision.areas.south).toContain(south.id);
  });

  it("registers entities that are overlaping", () => {
    const anEntity = new Entity("origin-id", 0, 0);
    const overlap = new Entity("overlap-id", 0, 0);

    CollisionSystem.run([anEntity, overlap]);

    expect(anEntity.collision.areas.overlap).toContain(overlap.id);
  });

  it("clears collision if adjacent entity moves", () => {
    const anEntity = new Entity("origin-id", 0, 0);
    const overlap = new Entity("adjacent-id", 0, 0);

    CollisionSystem.run([anEntity, overlap]);

    expect(anEntity.collision.areas.overlap).toContain(overlap.id);

    overlap.position.x = 2;
    CollisionSystem.run([anEntity, overlap]);

    expect(anEntity.collision.areas.overlap).toHaveLength(0);
  });
});

class Entity {
  collision: Collision;
  id: string;
  position: Position;

  constructor(id, x, y) {
    this.id = id;
    this.position = new Position(x, y);
    this.collision = new Collision();
  }
}
