import { describe, expect, it, beforeEach } from 'vitest'
import { Velocity } from "../components/index.js";
import { INPUTS } from "../input.js";
import { KeyboardControl } from "./KeyboardControl.js";

describe("KeyboardControl system", () => {
  it("accelerates entity to the right", () => {
    const entity = new Entity(0, 0);

    const action = { key: INPUTS.ArrowRight}
    KeyboardControl.run([entity], action);

    expect(entity.velocity.x).toEqual(1);
    expect(entity.velocity.y).toEqual(0);
  });

  it("accelerates entity to the left", () => {
    const entity = new Entity(0, 0);

    const action = { key: INPUTS.ArrowLeft}
    KeyboardControl.run([entity], action);

    expect(entity.velocity.x).toEqual(-1);
    expect(entity.velocity.y).toEqual(0);
  });

  it("accelerates entity to the top", () => {
    const entity = new Entity(0, 0);

    const action = { key: INPUTS.ArrowUp}
    KeyboardControl.run([entity], action);

    expect(entity.velocity.x).toEqual(0);
    expect(entity.velocity.y).toEqual(-1);
  });

  it("accelerates entity to the bottom", () => {
    const entity = new Entity(0, 0);

    const action = { key: INPUTS.ArrowDown}
    KeyboardControl.run([entity], action);

    expect(entity.velocity.x).toEqual(0);
    expect(entity.velocity.y).toEqual(1);
  });
});

class Entity {
  velocity: Velocity;
  keyboardControlled: boolean;

  constructor(velocityX, velocityY) {
    this.velocity = new Velocity(velocityX, velocityY);
    this.keyboardControlled = true;
  }
}
