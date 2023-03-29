import { Game } from "./Game.js";
import { Bus } from "./infra/bus.js";
import { handleInput } from "./input.js";
import { EVENTS } from "./actions.js";
import { AnimationQueue, HitAnimation } from "./animations/index.js";
import { FPS_CAP, isTextMode } from "./config.js";
import { ShootAnimation } from "./animations/animations.js";
import { Display } from "./render/Display.js";
import { UIRenderer } from "./render/UIRenderer.js";
import { GlyphRenderer } from "./render/GlyphRenderer.js";
import { TileRenderer } from "./render/TileRenderer.js";

export const loadGame = () => {
  const bus = new Bus();
  const display = new Display();
  const game = new Game(bus);
  const ui = new UIRenderer(bus);
  const animations = new AnimationQueue();
  let mouse = { x: undefined, y: undefined};

  const runFrame = () => {
    if (isTextMode()) {
      GlyphRenderer.run(display, game.state);
    } else {
      TileRenderer.run(display, game.state, animations, mouse);
    }

    setTimeout(() => {
      requestAnimationFrame(runFrame);
    }, 1000 / FPS_CAP);
  };

  handleInput(bus);
  bus.subscribe(EVENTS.MOUSE_MOVED, (mousePosition) => {
    mouse = mousePosition;
  });
  
  bus.subscribe(EVENTS.ACTION_EXECUTED, (action) => {
    game.runMainLoop(action);
    ui.update(game.state);
  });

  bus.subscribe(EVENTS.HIT, ({ x, y }) => { // Responsability of the glyph renderer
    animations.add(new HitAnimation(x, y));
  });

  bus.subscribe(EVENTS.SHOT_FIRED, ({ origin, target }) => {
    animations.add(new ShootAnimation(origin, target));
  });

  ui.update(game.state);
  runFrame();
};

window.onload = () => loadGame();
