import { Game } from "./Game.js";
import { Bus } from "./infra/bus.js";
import { handleInput } from "./input.js";
import { EVENTS } from "./events.js";
import { render } from "./render/index.js";
import { AnimationQueue, HitAnimation } from "./animations/index.js";
import { FPS_CAP } from "./config.js";
import { ShootAnimation } from "./animations/animations.js";
import { Display } from "./render/Display.js";
import { UIRenderer } from "./render/UIRenderer.js";

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


  bus.subscribe(EVENTS.MOUSE_MOVED, (mousePosition) => {
    mouse = mousePosition;
  });
  
  handleInput(bus);
  handleSubscriptions(bus, game, animations);
  runFrame();
};

const handleSubscriptions = (
  bus: Bus,
  game: Game,
  animations: AnimationQueue,
) => {
  bus.subscribe(EVENTS.TURN_PASSED, (action) => {
    game.runMainLoop(action);
  });

  bus.subscribe(EVENTS.HIT, ({ x, y }) => {
    animations.add(new HitAnimation(x, y));
  });

  bus.subscribe(EVENTS.SHOT_FIRED, ({ origin, target }) => {
    animations.add(new ShootAnimation(origin, target));
  });
  
};

window.onload = () => loadGame();
