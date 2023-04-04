import { describe, expect, it, beforeEach } from "vitest";
import { Snake } from "../entities/enemies/Enemy.js";
import { PseudoDog } from "../entities/enemies/PseudoDog";
import { EnemySpawner } from "./EnemySpawner.js";

describe("EnemySpawner", () => {
  it("spawns snakes", () => {
    const seed = "12";
    const enemies = EnemySpawner.spawn(seed);

    expect(enemies[0].name).toEqual("snake");
  });

  it("spawns pseudodogs", () => {
    const seed = "11";
    const enemies = EnemySpawner.spawn(seed);

    expect(enemies[0].name).toEqual("pseudo dog");
  });
});
