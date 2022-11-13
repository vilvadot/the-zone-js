import { Matrix } from "./data-structures/Matrix.js";
import { TILES } from "./tiles.js";

export class AnimationQueue {
  animations: Array<HitAnimation>;
  constructor() {
    this.animations = [];
  }

  add(animation) {
    this.animations.push(animation);
  }

  composeNextFrame(): Matrix {
    let result = new Matrix();
    for (const [index, animation] of this.animations.entries()) {
      const nextFrame = animation.nextFrame();
      if (nextFrame) result.merge(nextFrame);
    }

    return result;
  }
}

export class HitAnimation {
  frames: Matrix[];
  currentFrame: number;

  constructor(x: number, y: number) {
    this.currentFrame = 0;
    this.frames = [new Matrix().setValue(x, y, TILES.hit)];
  }

  nextFrame(): Matrix | undefined {
    if (this.isFinished()) return;

    const frame = this.frames[this.currentFrame];
    this.currentFrame++;

    return frame;
  }

  isFinished(): boolean {
    return this.currentFrame === this.frames.length;
  }
}
