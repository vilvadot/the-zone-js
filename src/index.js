import { Game } from "./Game.js";
import { World, Grid } from "./World/index.js";
import { initDisplay } from "./Display.js";
import { Bus } from "./events.js";
import { Enemy, Player, Anomaly } from "./entities/index.js";

import { OPTIONS } from "./config.js";

const { width, height } = OPTIONS;

const NUMBER_ENEMIES = 10;

window.onload = () => {
  const bus = new Bus();
  const display = initDisplay();

  const worldGenerator = new ROT.Map.Cellular(width - 1, height - 1);
  const map = new Grid(width, height);
  const world = new World(bus, display, map, worldGenerator);

  const enemies = [];
  for (let i = 0; i < NUMBER_ENEMIES; i++) {
    enemies.push(new Enemy(`enemy-${i}`, `player`));
  }

  const entities = [...enemies, new Player(), new Anomaly()];

  new Game(bus, display, world, entities).runMainLoop();
};
