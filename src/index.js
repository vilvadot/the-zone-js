import { takeControlOfInputs } from "./input.js";
import { Game } from './Game.js'
import { World, Grid } from './World/index.js'
import { initDisplay } from './Display.js'
import { Bus, EVENTS } from "./Bus.js";
import { Player } from "./Player.js";

import { OPTIONS } from './config.js'

const { width, height } = OPTIONS

window.onload = () => {
  const bus = new Bus()

  takeControlOfInputs(bus)
  const display = initDisplay()

  const worldGenerator = new ROT.Map.Cellular(width - 1, height - 1)
  const map = new Grid(width, height)
  const world = new World(bus, display, map, worldGenerator)
  const character = new Player(bus, display, world)

  new Game(bus, display, world, character).init();

  bus.subscribe(EVENTS.PLAYER_MOVED, () => {
    const $turns = document.querySelector("#turns")
    const value = Number($turns.textContent)
    $turns.innerHTML = value + 1
  })
}
