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
import { TILES } from "./tiles.js";
// import { TILES } from "./tiles.js";

export const loadGame = () => {
  const bus = new Bus();
  const display = new Display();
  const game = new Game(bus);
  const ui = new UIRenderer(bus);
  let mouse = undefined;
  
  takeControlOfInputs(bus);
  
  setInterval(() => {
    render(game, display, ui, mouse);
  }, 60)

  bus.subscribe(EVENTS.TURN_PASSED, (action) => {
    game.runMainLoop(action);
  });

  bus.subscribe(EVENTS.MOUSE_MOVED, (mousePosition) => {
    mouse = mousePosition
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
