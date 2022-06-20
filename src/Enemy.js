import { addTileNodeToGame } from "./utils.js";
import { EVENTS } from "./Bus.js";

export class Enemy {
  constructor(bus, world) {
    this.bus = bus;
    this.world = world;
    this.position = this.world.getRandomFreeCell();
    this.$node = addTileNodeToGame("enemy");
    this._subscribe();
  }

  get x() {
    return this.position.x;
  }

  get y() {
    return this.position.y;
  }

  draw() {
    this.$node.style.top = this.position.y * 20;
    this.$node.style.left = this.position.x * 20;
  }

  _moveTowardsPlayer({ x: playerX, y: playerY }) {
    // TODO: Convertir a vectores
    // - Difencia player-enemy
    // - Normalizacion normalizar
    // - Adicion enemy+diferencia

    // TODO: Hacer que evite obstáculos
    const xDifference = playerX - this.x;
    const yDifference = playerY - this.y;
    const newPosition = { ...this.position}
    if(xDifference < 0 ){
      newPosition.x--
    }else if(xDifference > 0 ){
      newPosition.x++
    }

    if(yDifference < 0 ){
      newPosition.y--
    }else if(yDifference > 0 ){
      newPosition.y++
    }

    console.log(this.world.isBlocked(newPosition))

    if(this.world.isBlocked(newPosition.x, newPosition.y)){
      return
    }
    console.log("not blocked!")

    this.position = {...newPosition}
  }

  _subscribe() {
    this.bus.subscribe(EVENTS.PLAYER_MOVED, (playerPosition) => {
      this._moveTowardsPlayer(playerPosition);
    });
  }
}
