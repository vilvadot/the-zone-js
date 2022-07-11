import { Game } from "./Game.js";
import { World, Grid, Generator } from "./World/index.js";
import { Display } from "./Display.js";
import { Bus } from "./events.js";
import { Player } from "./entities/index.js";

import { OPTIONS } from "./config.js";
import { EnemySpawner } from "./spawners/EnemySpawner.js";
import { AnomalySpawner } from "./spawners/AnomalySpawner.js";

const { width, height } = OPTIONS;

const NUMBER_ENEMIES = 10;
const NUMBER_ANOMALIES = 10;

export const loadGame = (width, height) => {
  const bus = new Bus();
  const display = new Display()

  const worldGenerator = new Generator(width - 1, height - 1);
  const map = new Grid(width, height);
  const world = new World(bus, display, map, worldGenerator);

  const enemies = EnemySpawner.spawn(NUMBER_ENEMIES)
  const anomalies = AnomalySpawner.spawn(NUMBER_ANOMALIES)
  const entities = [new Player(), ...enemies, ...anomalies];

  new Game(bus, display, world, entities).runMainLoop();
}

window.onload = () => loadGame(width, height)