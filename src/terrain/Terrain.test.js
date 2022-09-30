import { Terrain } from "./Terrain";

describe("Terrain", () => {
  it("knows if a cell is blocked", () => {
    const terrain = new Terrain(1, 1);

    terrain.addWall(0, 0);

    expect(terrain.isBlocked(0, 0)).toBe(true);
  });

  it("knows if a cell is out of bounds", () => {
    const terrain = new Terrain(1, 1);

    expect(terrain.isBlocked(3, 3)).toBe(true);
  });

  it("knows if a cell is free", () => {
    const terrain = new Terrain(1, 1);

    expect(terrain.isBlocked(0, 0)).toBe(false);
  });

  it("[recursive] provides free tiles", () => {
    const terrain = new Terrain(3, 3);
    terrain.addWall(0, 0);

    const { x, y } = terrain.getRandomFreeCell();

    expect(terrain.isBlocked(x, y)).toBe(false);
  });
});