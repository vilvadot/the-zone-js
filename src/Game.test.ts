import { describe, expect, it, beforeEach } from 'vitest'
import { Entity } from './entities/index.js';
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

  it("there are no enemies on starting area", () => {
    const game = new Game(bus);

    game.runMainLoop({ key: INPUTS["ArrowRight"] });

    const { entities } = game;
    const enemy = findEntity(entities, 'enemy')
    expect(enemy).toBeUndefined()
  })

  it("player moves", () => {
    const game = new Game(bus);
    const { x, y } = game.player.position;

    game.runMainLoop({ key: INPUTS["ArrowRight"] });

    const { navigation, player } = game;
    expect(navigation.coordinates).toEqual([0, 0]);
    expect(player.position).toEqual({ x: x! + 1, y });
  });
});

const findEntity = (entities: Entity[], name: string) => {
  return entities.find((entity) => entity.name === name)
}

const createFakeGameNode = () => {
  const game = document.createElement("div");
  game.id = "game";
  document.body.appendChild(game);
};
