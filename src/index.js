import { Game } from "./Game.js";
import { Display } from "./infra/display.js";
import { Bus } from "./infra/bus.js";
import { takeControlOfInputs } from "./input.js";
import { EVENTS } from "./events.js";

export const loadGame = () => {
  const bus = new Bus();
  const display = new Display()

  const game = new Game(bus, display)
  game.runMainLoop()

  takeControlOfInputs(bus);
  
  bus.subscribe(EVENTS.TURN_PASSED, (action) => {
    game.runMainLoop(action)
  })
}

window.onload = () => loadGame()