import { describe, expect, it, beforeEach } from "vitest";
import { Position } from "./components/index.js";
import { HEIGHT, WIDTH } from "./config.js";
import { Matrix } from "./data-structures/Matrix.js";
import { Entity } from "./entities/index.js";
import { Game } from "./Game.js";
import { Bus } from "./infra/bus.js";
import { INPUTS } from "./input.js";
import { Terrain } from "./terrain/Terrain.js";
import { repeat } from "./util.js";

describe("E2E Game test", () => {
  let bus: Bus;

  beforeEach(() => {
    createFakeGameNode();
    bus = new Bus();
  });

  it("there are no enemies on starting area", () => {
    const game = new Game(bus);

    game.runMainLoop({ key: INPUTS["ArrowRight"] });

    const { entities } = game;
    const enemy = findEntity(entities, "enemy");
    expect(enemy).toBeUndefined();
  });

  it("player moves", () => {
    const game = new Game(bus);
    const { x, y } = game.player.position;

    game.runMainLoop({ key: INPUTS["ArrowRight"] });

    const { player } = game;
    expect(player.position).toEqual({ x: x! + 1, y });
  });

  it("player can travel east", () => {
    const game = new Game(bus);
    forceClearTerrain(game);

    repeat(WIDTH, () => {
      game.runMainLoop({ key: INPUTS["ArrowRight"] });
    });

    const { areaManager } = game;
    const area = areaManager.getCoordinates();
    expect(area).toEqual("1,0");
  });

  it("player can travel west", () => {
    const game = new Game(bus);
    forceClearTerrain(game);
    forcePlayerInCenter(game);

    repeat(WIDTH, () => {
      game.runMainLoop({ key: INPUTS["ArrowLeft"] });
    });

    const { areaManager } = game;
    const area = areaManager.getCoordinates();
    expect(area).toEqual("-1,0");
  });

  it("player can travel north", () => {
    const game = new Game(bus);
    forcePlayerInCenter(game);
    forceClearTerrain(game);

    repeat(HEIGHT, () => {
      game.runMainLoop({ key: INPUTS["ArrowUp"] });
    });

    const { areaManager } = game;
    const area = areaManager.getCoordinates();
    expect(area).toEqual("0,1");
  });

  it("player can travel south", () => {
    const game = new Game(bus);
    forcePlayerInCenter(game);
    forceClearTerrain(game);

    repeat(HEIGHT, () => {
      game.runMainLoop({ key: INPUTS["ArrowDown"] });
    });

    const { areaManager } = game;
    const area = areaManager.getCoordinates();
    expect(area).toEqual("0,-1");
  });
});

const forcePlayerInCenter = (game) => 
{
  const x = Math.floor(WIDTH / 2)
  const y = Math.floor(HEIGHT / 2)
  game.player.position = new Position(x, y);
};

const forceClearTerrain = (game) => {
  game.terrain = new Terrain(WIDTH, HEIGHT);
};

const findEntity = (entities: Entity[], name: string) => {
  return entities.find((entity) => entity.name === name);
};

const createFakeGameNode = () => {
  const game = document.createElement("div");
  game.id = "game";
  document.body.appendChild(game);
};