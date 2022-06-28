import { Position, Spawn } from "../components";
import { Spawn as SpawnSystem } from "./Spawn";

describe("Spawn system", () => {
  it("spawns entity at coordinates origin by default", () => {
    const entity = new Entity(1, 1);

    SpawnSystem.run([entity]);

    expect(entity.position.x).toEqual(0);
    expect(entity.position.y).toEqual(0);
  });

  it("spawns entity random free cell in 'random' mode", () => {
    const entity = new Entity(1, 1, "random");
    const world = {
      getRandomFreeCell: () => ({ x: 3, y: 3 }),
    };

    SpawnSystem.run([entity], world);

    expect(entity.position.x).toEqual(3);
    expect(entity.position.y).toEqual(3);
  });
});

class Entity {
  constructor(x, y, spawnMode) {
    this.position = new Position(x, y);
    this.spawn = new Spawn(spawnMode);
  }
}
