import { Game } from "./Game.js";
import { Bus } from "./infra/bus.js";
import { takeControlOfInputs } from "./input.js";
import { EVENTS } from "./events.js";
import { UIRenderer, TileRenderer, Display } from "./render/index.js";
import { isTextMode } from "./config.js";
import { GlyphRenderer } from "./render/GlyphRenderer.js";
import { AnimationQueue, HitAnimation } from "./animation.js";

export const loadGame = () => {
  const bus = new Bus();
  const display = new Display();
  const game = new Game(bus);
  const ui = new UIRenderer(bus);
  const animations = new AnimationQueue();

  let mouse = undefined;

  takeControlOfInputs(bus);
  handleSubscriptions(bus, game, animations, mouse);

  setInterval(() => {
    render(game, display, ui, animations, mouse);
  }, 100);
};

const handleSubscriptions = (bus: Bus, game: Game, animations: AnimationQueue, mouse: any ) => {
  bus.subscribe(EVENTS.TURN_PASSED, (action) => {
    game.runMainLoop(action);
  });

  bus.subscribe(EVENTS.MOUSE_MOVED, (mousePosition) => {
    mouse = mousePosition;
  });

  bus.subscribe(EVENTS.HIT, ({ x, y }) => {
    animations.add(new HitAnimation(x, y));
  });
};

const render = (game, display, ui, animationQueue, mouse?) => {
  const { fov, terrain, entities, turn, area } = game.state;

  if (isTextMode()) {
    GlyphRenderer.run(display, fov, terrain, entities, mouse);
  } else {
    TileRenderer.run(display, fov, terrain, entities, animationQueue, mouse);
  }

  ui.update(entities, turn, area);
};

window.onload = () => loadGame();
