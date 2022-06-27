import { Position, Sprite} from "../components/index.js";
import { TILES } from "../tiles.js";

export class Player {
  constructor() {
    this.id = 'player'
    this.inputControlled = true
    this.spawn = 'origin'
    this.sprite = new Sprite(this.id, TILES.player, 'blue');
    this.position = new Position(10, 10);
  }
}
