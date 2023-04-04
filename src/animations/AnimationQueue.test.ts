import { describe, expect, it } from "vitest";
import { AnimationQueue } from "./AnimationQueue.js";
import { HitAnimation } from "./animations.js";

describe("AnimationQueue", () => {
  it("provides next animation frame", () => {
    const queue = new AnimationQueue();
    const hitAtOrigin = new HitAnimation(0, 0);
    queue.add(hitAtOrigin);

    const nextFrame = queue.composeNextFrame();

    expect(nextFrame.getValue(0, 0)).toBeDefined();
  });

  it("combines multiple animations", () => {
    const queue = new AnimationQueue();
    const hitAtOrigin = new HitAnimation(0, 0);
    const hitAtRight = new HitAnimation(1, 0);
    queue.add(hitAtOrigin);
    queue.add(hitAtRight);

    const nextFrame = queue.composeNextFrame();

    expect(nextFrame.getValue(0, 0)).toBeDefined();
    expect(nextFrame.getValue(1, 0)).toBeDefined();
    expect(nextFrame.getValue(2, 0)).toBeUndefined();
  });
});
