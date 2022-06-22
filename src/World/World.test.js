import { World } from "./World";
import { Grid } from "./Grid";
import { Bus } from "../events";

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
    const world = createWorld();

    world.addWall(0, 0);

    expect(world.isBlocked(0, 0)).toBe(true);
  });

  it("knows where the world ends", () => {
    const world = createWorld({ map: new Grid(1, 1) });

    expect(world.isBlocked(3, 3)).toBe(true);
  });

  it("knows if a cell is free", () => {
    const world = createWorld({ map: new Grid(1, 1) });

    expect(world.isBlocked(0, 0)).toBe(false);
  });

  it("[recursive] provides free tiles", () => {
    const world = createWorld({ map: new Grid(3, 3) });
    world.addWall(0, 0);

    const { x, y } = world.getRandomFreeCell();

    expect(world.isBlocked(x, y)).toBe(false);
  });
});

const createWorld = ({
  width = 1,
  height = 1,
  map = new Grid(width, height),
} = {}) => {
  class GeneratorStub {}
  const displaystub = () => {
    return {
      clear: jest.fn(),
      draw: jest.fn(),
    };
  };

  return new World(new Bus(), displaystub(), map, new GeneratorStub());
};
