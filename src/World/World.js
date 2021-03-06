import { COLORS } from '../colors.js'
import { TILES } from '../tiles.js'
import { randomFloat, roll } from '../util.js'

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

  generate() {
    this.generator
      .generate((x, y, isFilled) => {
        const tile = isFilled ? TILES.wall : TILES.empty
        this.map.add(x, y, tile)
      })
  }

  addWall(x,y){
    this.map.add(x,y, TILES.wall)
    return this
  }

  draw() {
    this.map.forEach((x, y, value) => {
    const displacementX = randomSign(randomFloat(0, 0.15))
    const displacementY = randomSign(randomFloat(0, 0.15))
      this.display.draw(x + displacementX, y + displacementY, value, COLORS[value]);
    });
  }

  getCenter(){
    return {
      x: Math.floor(this.width / 2),
      y: Math.floor(this.height / 2) 
    }
  }

  isBlocked(x, y){
    const tile = this.map.getTile(x,y)
    if (!tile) return true

    const isFree = tile === TILES.empty
    return !isFree
  }

  getRandomFreeCell(){
    let tile = this.map.getRandomCellCoordinates()
    if(this.isBlocked(tile.x, tile.y)) return this.getRandomFreeCell()
    return tile
  }
};


const randomSign = (value) => {
  if (roll()) return value * -1
  return value
}