import { Game } from "./Game.js";
import { Bus } from "./infra/bus.js";
import { takeControlOfInputs } from "./input.js";
import { EVENTS } from "./events.js";
import {
  UIRenderer,
  TerrainRenderer,
  EntityRenderer,
  Display,
} from "./render/index.js";

export const loadGame = () => {
  const bus = new Bus();
  const display = new Display();
  const game = new Game(bus);
  const ui = new UIRenderer(bus);
  takeControlOfInputs(bus);
  game.runMainLoop();
  render(game, display, ui);

  bus.subscribe(EVENTS.TURN_PASSED, (action) => {
    game.runMainLoop(action);
    render(game, display, ui);
  });

  bus.subscribe(EVENTS.MOUSE_MOVED, (mouse) => {
    render(game, display, ui, mouse);
  });
};

const render = (game, display, ui, mouse?) => {
  const { fov, terrain, entities, turn, area } = game.state;

  TerrainRenderer.run(display, fov, terrain, mouse);
  EntityRenderer.run(entities, fov);
  ui.update(entities, turn, area);
};

window.onload = () => loadGame();
