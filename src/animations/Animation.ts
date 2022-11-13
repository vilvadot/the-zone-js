import { Matrix } from "../data-structures/Matrix";

export abstract class Animation {
    currentFrame: number;
    abstract frames: Matrix[];
  
    constructor() {
      this.currentFrame = 0;
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
  