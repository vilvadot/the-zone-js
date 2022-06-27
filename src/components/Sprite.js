export class Sprite {
  constructor(id, tile, color = "black", zIndex = 2) {
    this.id = id;
    this.tile = tile;
    this.node = null;
    this.color = color;
    this.zIndex = zIndex;
  }
}
