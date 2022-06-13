import { takeControlOfInputs } from "./input.js";
import { Game } from './Game.js'
import { World } from './World/index.js'
import { initDisplay } from './Display.js'
import { Bus } from "./Bus.js";
import { Player } from "./Player.js";

import { OPTIONS } from './config.js'

const { width, height } = OPTIONS

window.onload = () => {
  const bus = new Bus()

  takeControlOfInputs(bus)
  const display = initDisplay()
  
  const world = new World(bus, display, width, height)
  const character = new Player(bus, display)

  new Game(bus, display, world, character).init();
}
