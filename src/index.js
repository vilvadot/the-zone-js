import { Game } from "./Game.js";
import { World, Grid, Generator } from "./World/index.js";
import { Display } from "./Display.js";
import { Bus } from "./events.js";
import { Player } from "./entities/index.js";
import { WIDTH, HEIGHT, LIMIT } from "./config.js";
import { EnemySpawner } from "./spawners/EnemySpawner.js";
import { ArtifactSpawner } from "./spawners/ArtifactSpawner.js";
import { takeControlOfInputs } from "./input.js";
import { EVENTS } from "./events.js";

export const loadGame = (width, height) => {
  const bus = new Bus();
  const display = new Display()

  const worldGenerator = new Generator(width - 1, height - 1);
  const map = new Grid(width, height);
  const world = new World(bus, display, map, worldGenerator);

  const enemies = EnemySpawner.spawn(LIMIT.enemies)
  const anomalies = ArtifactSpawner.spawn(LIMIT.anomalies)
  const entities = [...enemies, ...anomalies];

  const game = new Game(bus, display, world, entities, new Player())
  game.runMainLoop()

  takeControlOfInputs(bus);
  
  bus.subscribe(EVENTS.TURN_PASSED, (action) => {
    game.runMainLoop(action)
  })
}

window.onload = () => loadGame(WIDTH, HEIGHT)