import {Grid} from './Grid.js'
import { TILES, COLORS } from '../config.js'

export class World {
  constructor(bus, display, generator, width, height) {
    this.bus = bus
    this.display = display
    this.map = new Grid(width, height)
    this.generator = generator
  }

  generate() {
    this.generator
      .randomize(0.4)
      .create((x, y, isFilled) => {
        const tile = isFilled ? TILES.world : TILES.empty
        this.map.add(x, y, tile)
      })
  }

  isBlocked(x, y){
    const tile = this.map.get(x,y)
    if (!tile) return true

    const isFree = tile === TILES.empty
    return !isFree
  }

  draw() {
    this.map.forEach((x, y, value) => {
      this.display.draw(x, y, value, COLORS[value]);
    });
  }
};