import { describe, expect, it, beforeEach, vi } from "vitest";
import { Position } from "./components/index.js";
import { HEIGHT, WIDTH } from "./config.js";
import { Point } from "./data-structures/Point.js";
import { Entity } from "./entities/index.js";
import { ACTION_NAME, EVENTS } from "./actions.js";
import { Game } from "./Game.js";
import { Bus } from "./infra/bus.js";
import { KEYS } from "./input.js";
import { Terrain } from "./terrain/Terrain.js";
import { repeat } from "./util/index.js";

describe("E2E Game test", () => {
  let bus: Bus;

  beforeEach(() => {
    createFakeGameNode();
    bus = new Bus();
  });

  it("there are no enemies on starting coordinates", () => {
    const game = new Game(bus);
    const moveWest = { name: ACTION_NAME.MOVE, payload: { direction: "west"}}

    game.runMainLoop(moveWest);

    const { entities } = game;
    const enemy = findEntity(entities, "enemy");
    expect(enemy).toBeUndefined();
  });

  it("player moves", () => {
    const game = new Game(bus);
    const { player } = game.state;
    const { x, y } = player.position;
    const moveEast = { name: ACTION_NAME.MOVE, payload: { direction: "east"}}

    game.runMainLoop(moveEast);

    expect(player.position).toEqual({ x: x! + 1, y });
  });

  it("player can travel east", () => {
    const game = new Game(bus);
    forceClearTerrain(game);
    const moveEast = { name: ACTION_NAME.MOVE, payload: { direction: "east"}}

    repeat(WIDTH, () => {
      game.runMainLoop(moveEast);
    });

    const { coordinates } = game.state;
    expect(coordinates.x).toEqual(1);
    expect(coordinates.y).toEqual(0);
  });

  it("player can travel west", () => {
    const game = new Game(bus);
    forceClearTerrain(game);
    forcePlayerInCenter(game);
    const moveWest = { name: ACTION_NAME.MOVE, payload: { direction: "west"}}

    repeat(WIDTH, () => {
      game.runMainLoop(moveWest);
    });

    const { coordinates } = game.state;
    expect(coordinates.x).toEqual(-1);
    expect(coordinates.y).toEqual(0);
  });

  it("player can travel north", () => {
    const game = new Game(bus);
    forcePlayerInCenter(game);
    forceClearTerrain(game);
    const moveNorth = { name: ACTION_NAME.MOVE, payload: { direction: "north"}}

    repeat(HEIGHT, () => {
      game.runMainLoop(moveNorth);
    });

    const { coordinates } = game.state;
    expect(coordinates.x).toEqual(0);
    expect(coordinates.y).toEqual(1);
  });

  it("player can travel south", () => {
    const game = new Game(bus);
    forcePlayerInCenter(game);
    forceClearTerrain(game);
    const moveSouth = { name: ACTION_NAME.MOVE, payload: { direction: "south"}}

    repeat(HEIGHT, () => {
      game.runMainLoop(moveSouth);
    });

    const { coordinates } = game.state;
    expect(coordinates.x).toEqual(0);
    expect(coordinates.y).toEqual(-1);
  });

  it("player can shoot", () => {
    const game = new Game(bus);
    vi.spyOn(bus, "emit");
    const [playerX, playerY] = forcePlayerInCenter(game);
    forceClearTerrain(game);
    const shotX = 1;
    const shotY = 10;
    const shoot = { name: ACTION_NAME.SHOOT, payload: { x: shotX, y: shotY}}

    game.runMainLoop(shoot);

    expect(bus.emit).toHaveBeenCalledWith(EVENTS.SHOT_FIRED, {
      origin: new Point(playerX, playerY),
      target: new Point(shotX, shotY),
    });
  });
});

const forcePlayerInCenter = (game) => {
  const x = Math.floor(WIDTH / 2);
  const y = Math.floor(HEIGHT / 2);
  game.state.player.position = new Position(x, y);
  return [x, y];
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
