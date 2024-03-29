import { Game } from "./Game.js";
import { Bus } from "./infra/bus.js";
import { handleInput } from "./input.js";
import { EVENTS } from "./actions.js";
import { AnimationQueue, HitAnimation } from "./render/animations/index.js";
import { FPS_CAP, isTextMode } from "./config.js";
import { ShootAnimation } from "./render/animations/animations.js";
import { Display } from "./render/Display.js";
import { UIRenderer } from "./render/UIRenderer.js";
import { GlyphRenderer } from "./render/GlyphRenderer.js";
import { TileRenderer } from "./render/TileRenderer.js";
import { InspectTooltip } from "./render/ui/index.js";

export interface MousePosition {
  x: number | undefined;
  y: number | undefined;
  tileX: number | undefined;
  tileY: number | undefined;
}

export const loadGame = () => {
  const bus = new Bus();
  const display = new Display();
  const game = new Game(bus);
  const ui = new UIRenderer(bus);
  const animations = new AnimationQueue();
  let mouse: MousePosition = {
    x: undefined,
    y: undefined,
    tileX: undefined,
    tileY: undefined,
  };

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

  handleInput(bus, game.state);

  const inspectionTooltip = new InspectTooltip();

  bus.subscribe(EVENTS.MOUSE_MOVED, (mousePosition) => {
    mouse = mousePosition;
    inspectionTooltip.update(game.state, mouse);
  });

  bus.subscribe(EVENTS.ACTION_EXECUTED, (action) => {
    game.runMainLoop(action);
    ui.update(game.state, mouse);
  });

  bus.subscribe(EVENTS.HIT, ({ x, y }) => {
    // Responsability of the glyph renderer
    animations.add(new HitAnimation(x, y));
  });

  bus.subscribe(EVENTS.SHOT_FIRED, ({ origin, target }) => {
    animations.add(new ShootAnimation(origin, target));
  });

  ui.update(game.state, mouse);
  runFrame();
};

window.onload = () => loadGame();
