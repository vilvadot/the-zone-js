export class Sprite {
  constructor(id, tile, color = "black") {
    this.id = id;
    this.tile = tile;
    this.node = null;
    this.color = color
  }
}
