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
  constructor([x = 19, y = 19] = [], zIndex = 1, additionalClass = '') {
    this.x = x;
    this.y = y;
    this.zIndex = zIndex;
    
    this.additionalClass = additionalClass;
  }
}

export class TargetManual {
  constructor(id) {
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
      ...areas,
    };
  }
}

export class Animation {
  constructor() {
    this.isActive = false;
    this.name = null;
  }

  set(animationName) {
    this.name = animationName;
    this.isActive = true;
  }
}
