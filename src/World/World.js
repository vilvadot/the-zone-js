import { TILES, COLORS } from '../config.js'

export class World {
  constructor(bus, display, map, generator) {
    this.bus = bus
    this.display = display
    this.map = map
    this.generator = generator
  } 
  get width(){
    return this.map.width
  }

  get height(){
    return this.map.height
  }

  getCenter(){
    return {
      x: Math.floor(this.width / 2),
      y: Math.floor(this.height / 2) 
    }
  }

  generate() {
    this.generator
      .randomize(0.4)
      .create((x, y, isFilled) => {
        const tile = isFilled ? TILES.wall : TILES.empty
        this.map.add(x, y, tile)
      })
  }

  isBlocked(x, y){
    const tile = this.map.getTile(x,y)
    if (!tile) return true

    const isFree = tile === TILES.empty
    return !isFree
  }

  draw() {
    this.map.forEach((x, y, value) => {
      this.display.draw(x, y, value, COLORS[value]);
    });
  }

  getFreeCell(){
    let tile = this.map.getRandomCellCoordinates()
    if(this.isBlocked(tile.x, tile.y)) return this.getFreeCell()
    return tile
  }
};