import { Game } from "./Game.js";
import { Display } from "./infra/display.js";
import { Bus } from "./infra/bus.js";
import { takeControlOfInputs } from "./input.js";
import { EVENTS } from "./events.js";
import { UIRenderer, TerrainRenderer, EntityRenderer } from "./render/index.js";

export const loadGame = () => {
  const bus = new Bus();
  const display = new Display();
  const game = new Game(bus, display);
  const ui = new UIRenderer(bus)

  takeControlOfInputs(bus);

  bus.subscribe(EVENTS.TURN_PASSED, (action) => {
    runTurn(action, game, display, ui);
  });

  runTurn(undefined, game, display, ui);
};

const runTurn = (action, game, display, ui) => {
  const { fov, world, entities, turn } = game.runMainLoop(action);
  ui.update(entities, turn);
  TerrainRenderer.run(display, fov, world);
  EntityRenderer.run(entities, fov);
};

window.onload = () => loadGame();
