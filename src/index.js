import { takeControlOfInputs } from "./input.js";
import { Game } from './Game.js'
import { World } from './World/index.js'
import { initDisplay } from './Display/index.js'
import { OPTIONS } from './config.js'

const { width, height } = OPTIONS

window.onload = () => {
  const display = initDisplay()
  const world = new World(display, width, height)

  takeControlOfInputs()
  new Game(display, world).init();
}
