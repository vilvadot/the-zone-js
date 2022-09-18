import { World } from "./World";

describe("World", () => {
  it("knows its center", () => {
    const width = 20;
    const height = 20;
    const world = new World(width, height);

    const center = world.getCenter();

    expect(center.x).toEqual(width / 2);
    expect(center.y).toEqual(height / 2);
  });

  it("knows if a cell is blocked", () => {
    const world = new World(1, 1);

    world.addWall(0, 0);

    expect(world.isBlocked(0, 0)).toBe(true);
  });

  it("knows where the world ends", () => {
    const world = new World(1, 1);

    expect(world.isBlocked(3, 3)).toBe(true);
  });

  it("knows if a cell is free", () => {
    const world = new World(1, 1);

    expect(world.isBlocked(0, 0)).toBe(false);
  });

  it("[recursive] provides free tiles", () => {
    const world = new World(3, 3);
    world.addWall(0, 0);

    const { x, y } = world.getRandomFreeCell();

    expect(world.isBlocked(x, y)).toBe(false);
  });
});