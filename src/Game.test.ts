import { describe, expect, it, beforeEach } from 'vitest'
import { Game } from "./Game.js";
import { Bus } from "./infra/bus.js";
import { INPUTS } from "./input.js";

describe("E2E Game test", () => {
  let bus: Bus;
  let display;

  beforeEach(() => {
    createFakeGameNode();
    bus = new Bus();
  });

  it("player moves", () => {
    const game = new Game(bus);
    const { x, y } = game.player.position;

    game.runMainLoop({ key: INPUTS["ArrowRight"] });

    const { navigation, player } = game;
    expect(navigation.coordinates).toEqual([0, 0]);
    expect(player.position).toEqual({ x: x! + 1, y });
  });
});

const createFakeGameNode = () => {
  const game = document.createElement("div");
  game.id = "game";
  document.body.appendChild(game);
};
