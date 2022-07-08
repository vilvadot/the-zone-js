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

  static random(){
    return new Spawn("random")
  }

  constructor(mode = "center") {
    this.mode = mode;
  }
}

export class Health {
  constructor(value = 0) {
    this.value = value;
    this.maxValue = value;
  }
}

export class Damage {
  constructor(value = 0) {
    this.value = value;
  }
}

export class Sprite {
  constructor(id, tile, color = "black", zIndex = 2, isHidden = false) {
    this.id = id;
    this.tile = tile;
    this.node = null;
    this.color = color;
    this.zIndex = zIndex;
    this.isHidden = isHidden;
  }
}

export class TargetManual{
  constructor(id){
        this.id = id;
    }
}


export class Collision {
  constructor(areas) {
    this.areas = {
      west: [],
      east: [],
      south: [],
      north: [],
      overlap: [],
      ...areas
    };
  }
}

export class Inventory {
    constructor(){
        this.content = []
    }

    add(item){
        this.content.push(item)
    }
}

export class Pickable {
  constructor(){
    this.isPicked = false;
  }
}

export class Animation {
  constructor(){
    this.isActive = false;
    this.name = null;
  }

  set(animationName){
    this.name = animationName
    this.isActive = true
  }
}