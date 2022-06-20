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

  it("knows if a cell is blocked", () => {
    const map = new Grid(1, 1).add(0, 0, "x");
    const world = createWorld({ map });

    expect(world.isBlocked(0, 0)).toBe(true);
  });

  it("knows where the world ends", () => {
    const map = new Grid(1, 1).add(0, 0, "x");
    const world = createWorld({ map });

    expect(world.isBlocked(3, 3)).toBe(true);
  });

  it("knows if a cell is free", () => {
    const map = new Grid(1, 1).add(0, 0, ".");
    const world = createWorld({ map });

    expect(world.isBlocked(0, 0)).toBe(false);
  });

  it("[recursive] provides free tiles", () => {
    const map = new Grid(3, 3).add(0, 0, "x")
    const world = createWorld({ map });

    const {x, y} = world.getFreeCell()

    expect(world.isBlocked(x, y)).toBe(false);
  });
});
