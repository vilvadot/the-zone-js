import {Grid} from './Grid.js'
import { TILES, COLORS } from '../config.js'

export class World {
  constructor(bus, display, generator, width, height) {
    this.width = width
    this.height = height
    this.bus = bus
    this.display = display
    this.map = new Grid(this.width, this.height)
    this.generator = generator
  }

  getCenter(){
    return {
      x: Math.floor(this.width / 2),
      y: Math.floor(this.height / 2) 
    }
  }

  generate() {
    const result = this.generator
      .randomize(0.4)
      .create((x, y, isFilled) => {
        const tile = isFilled ? TILES.world : TILES.empty
        this.map.add(x, y, tile)
      })
      console.log(result)
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