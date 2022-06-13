import {Grid} from './Grid.js'
import { TILES, COLORS } from '../config.js'

export class World {
  constructor(display, width, height) {
    this.display = display
    this.map = new Grid(width, height)
    this.generator = new ROT.Map.Cellular(width - 1, height - 1)
  }

  generate() {
    this.generator
      .randomize(0.4)
      .create((x, y, isFilled) => {
        const tile = isFilled ? TILES.world : TILES.empty
        this.map.add(x + 1, y + 1, tile)
      })
  }

  draw() {
    this.map.forEach((x, y, value) => {
      this.display.draw(x, y, value, COLORS[value]);
    });
  }
};