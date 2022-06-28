export class Position {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

export class Velocity {
  constructor(x = 0, y = 0) {
    this.x = x;
    this.y = y;
  }
}

export class Spawn {
  constructor(mode = "center") {
    this.mode = mode;
  }
}

export class Health {
  constructor(value = 0) {
    this.value = value;
  }
}

export class Damage {
  constructor(value = 0) {
    this.value = value;
  }
}

export class Sprite {
  constructor(id, tile, color = "black", zIndex = 2) {
    this.id = id;
    this.tile = tile;
    this.node = null;
    this.color = color;
    this.zIndex = zIndex;
  }
}

export class Target {
    constructor(mode = "automatic", id){
        this.id = id;
        this.mode = mode
    }
}