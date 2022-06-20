import { addTileNodeToGame } from "./utils.js";
import { EVENTS } from "./Bus.js";

export class Enemy {
  constructor(bus, world) {
    this.bus = bus;
    this.world = world;
    this.position = this.world.getFreeCell();
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

    // TODO: Hacer que no ande en diagonal

    // TODO: Hacer que evite obstáculos
    const xDifference = playerX - this.x;
    const yDifference = playerY - this.y;
    if(xDifference < 0 ){
      this.position.x--
    }else if(xDifference > 0 ){
      this.position.x++
    }

    if(yDifference < 0 ){
      this.position.y--
    }else if(yDifference > 0 ){
      this.position.y++
    }
  }

  _subscribe() {
    this.bus.subscribe(EVENTS.PLAYER_MOVED, (playerPosition) => {
      this._moveTowardsPlayer(playerPosition);
    });
  }
}
