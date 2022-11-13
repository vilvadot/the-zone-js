import { Game } from "./Game.js";
import { Bus } from "./infra/bus.js";
import { handleInput } from "./input.js";
import { EVENTS } from "./events.js";
import { UIRenderer, Display, render } from "./render/index.js";
import { AnimationQueue, HitAnimation } from "./animations/index.js";
import { FPS_CAP } from "./config.js";

export const loadGame = () => {
  const bus = new Bus();
  const display = new Display();
  const game = new Game(bus);
  const ui = new UIRenderer(bus);
  const animations = new AnimationQueue();
  let mouse = undefined;

  const runFrame = () => {
    render(game, display, ui, animations, mouse);

    setTimeout(() => {
      requestAnimationFrame(runFrame);
    }, 1000 / FPS_CAP);
  };

  handleInput(bus);
  handleSubscriptions(bus, game, animations, mouse);
  runFrame();
};

const handleSubscriptions = (
  bus: Bus,
  game: Game,
  animations: AnimationQueue,
  mouse: any
) => {
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

window.onload = () => loadGame();
