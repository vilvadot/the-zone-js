import { describe, expect, it, afterEach, vi } from "vitest";
import { Health, Position } from "../components/index.js";
import { Player } from "../entities/Player.js";
import { Shooting } from "./Shooting";
import { Logger } from "../infra/loggerStub.js";

describe("Shooting system", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it("damages entity if is at position of shot", () => {
    const entityX = 0;
    const entityY = 0;
    const initialHealth = 10;
    const target = new Entity(initialHealth, entityX, entityY);

    Shooting.run(
      Logger(),
      [target],
      entityX,
      entityY
    );

    expect(target.health.value).toBeLessThan(initialHealth);
  });

  it("does nothing to entities in other positions", () => {
    const entityX = 10;
    const entityY = 0;
    const initialHealth = 10;
    const target = new Entity(initialHealth, entityX, entityY);

    Shooting.run(
      Logger(),
      [target],
      0,
      entityY
    );

    expect(target.health.value).toEqual(initialHealth);
  });

  it("ignores player", () => {
    const targetX = 10;
    const targetY = 0;
    const target = new Player()
    const initialHealth = 10;
    target.health = new Health(initialHealth)
    target.position = new Position(targetX, targetY)

    Shooting.run(
      Logger(),
      [target],
      targetX,
      targetY
    );

    expect(target.health.value).toEqual(initialHealth);
  });
});

class Entity {
  health: Health;
  position: Position;

  constructor(health, x, y) {
    this.health = new Health(health);
    this.position = new Position(x, y);
  }
}