import { Matrix } from "../../data-structures/Matrix.js";
import { Animation } from "./Animation.js";

export class AnimationQueue {
  animations: Array<Animation>;

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
