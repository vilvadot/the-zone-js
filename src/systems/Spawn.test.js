import { Position } from "../components";
import { Spawn as SpawnSystem } from "./Spawn";

describe("Spawn system", () => {
  it("spawns entity without position in random free cell", () => {
    const entity = new Entity();
    const world = {
      getRandomFreeCell: () => ({ x: 3, y: 3 }),
    };

    SpawnSystem.run([entity], world);

    expect(entity.position.x).toEqual(3);
    expect(entity.position.y).toEqual(3);
  });

  it("does not affect already spawned entitites", () => {
    const entity = new Entity(1, 1);

    SpawnSystem.run([entity]);

    expect(entity.position.x).toEqual(1);
    expect(entity.position.y).toEqual(1);
  });
});

class Entity {
  constructor(x, y) {
    this.position = new Position(x, y);
  }
}
