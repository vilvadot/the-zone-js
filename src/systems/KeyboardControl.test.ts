import { describe, expect, it, beforeEach } from 'vitest'
import { ACTION_NAME } from '../actions.js';
import { Velocity } from "../components/index.js";
import { KEYS } from "../input.js";
import { KeyboardControl } from "./KeyboardControl.js";

describe("KeyboardControl system", () => {
  it("accelerates entity to the right", () => {
    const entity = new Entity(0, 0);
    const moveEast = { name: ACTION_NAME.MOVE, payload: { direction: "east"}}
   
    KeyboardControl.run(moveEast, [entity]);

    expect(entity.velocity.x).toEqual(1);
    expect(entity.velocity.y).toEqual(0);
  });

  it("accelerates entity to the left", () => {
    const entity = new Entity(0, 0);
    const moveWest = { name: ACTION_NAME.MOVE, payload: { direction: "west"}}
    
    KeyboardControl.run(moveWest, [entity]);

    expect(entity.velocity.x).toEqual(-1);
    expect(entity.velocity.y).toEqual(0);
  });

  it("accelerates entity to the top", () => {
    const entity = new Entity(0, 0);
    const moveNorth = { name: ACTION_NAME.MOVE, payload: { direction: "north"}}

    KeyboardControl.run(moveNorth, [entity]);

    expect(entity.velocity.x).toEqual(0);
    expect(entity.velocity.y).toEqual(-1);
  });

  it("accelerates entity to the bottom", () => {
    const entity = new Entity(0, 0);
    const moveSouth = { name: ACTION_NAME.MOVE, payload: { direction: "south"}}

    KeyboardControl.run(moveSouth, [entity]);

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
