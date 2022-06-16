import { Grid } from "./Grid";
import { createWorld } from "../_test_/stubs";

describe("World", () => {
  it("knows its center", () => {
    const width = 20;
    const height = 20;
    const world = createWorld({ map: new Grid(width, height) });

    const center = world.getCenter();

    expect(center.x).toEqual(width / 2);
    expect(center.y).toEqual(height / 2);
  });

  it("knows if a tile is blocked", () => {
    const map = new Grid(1, 1).add(0, 0, "x");
    const world = createWorld({ map });

    expect(world.isBlocked(0, 0)).toBeTruthy();
  });

  it("knows where the world ends", () => {
    const map = new Grid(1, 1).add(0, 0, "x");
    const world = createWorld({ map });

    expect(world.isBlocked(3, 3)).toBeTruthy();
  });

  it("knows if a tile is free", () => {
    const map = new Grid(1, 1).add(0, 0, ".");
    const world = createWorld({ map });

    expect(world.isBlocked(0, 0)).toBeFalsy();
  });
});
