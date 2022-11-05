import { Game } from "./Game.js";
import { Bus } from "./infra/bus.js";
import { takeControlOfInputs } from "./input.js";
import { EVENTS } from "./events.js";
import {
  UIRenderer,
  TileRenderer,
  Display,
} from "./render/index.js";
import { isTextMode } from "./config.js";
import { GlyphRenderer } from "./render/GlyphRenderer.js";

export const loadGame = () => {
  const bus = new Bus();
  const display = new Display();
  const game = new Game(bus);
  const ui = new UIRenderer(bus);
  takeControlOfInputs(bus);
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
  if(isTextMode()){
    GlyphRenderer.run(display, fov, terrain, entities, mouse);
  } else{
    TileRenderer.run(display, fov, terrain, entities, mouse);
  }
  ui.update(entities, turn, area);
};

window.onload = () => loadGame();
