import { Spawn, Position, InputControlled, Sprite} from "../components/index.js";
import { TILES } from "../tiles.js";

export class Player {
  constructor(bus) {
    this.id = 'player'
    this.bus = bus;
    this.sprite = new Sprite(this.id, TILES.player, 'blue');
    this.position = new Position(10, 10);
    this.inputControlled = new InputControlled(bus);
    this.spawn = new Spawn('center')
  }
}
