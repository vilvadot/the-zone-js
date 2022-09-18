import { Game } from "./Game.js";
import { Bus } from "./infra/bus.js";
import { INPUTS } from "./input.js";

describe("E2E Game test", () => {
  let bus;
  let display;

  beforeEach(() => {
    createFakeGameNode();
    bus = new Bus();
    display = new MockDisplay();
  });

  it("loads a game", () => {
    const { navigation, player } = new Game(bus, display);

    expect(navigation.coordinates).toEqual([0, 0]);
    expect(player.position).toEqual({ x: 19, y: 12 });
  });

  it("player moves", () => {
    const game = new Game(bus, display);

    game.runMainLoop({ key: INPUTS["ArrowRight"] });

    const { navigation, player } = game;
    expect(navigation.coordinates).toEqual([0, 0]);
    expect(player.position).toEqual({ x: 20, y: 12 });
  });
});

class MockDisplay {
  clear() {
    return jest.fn();
  }

  draw() {
    return jest.fn();
  }
}

const createFakeGameNode = () => {
  const game = document.createElement("div");
  game.id = "game";
  document.body.appendChild(game);
};
