import { describe, expect, it, beforeEach } from 'vitest'
import { Snake } from "../entities/enemies/Enemy.js";
import { EnemySpawner } from "./EnemySpawner.js";

describe("EnemySpawner", () => {
  it("spawns snakes", () => {
    const quantity = 3;

    const enemies = EnemySpawner.spawn(quantity);

    expect(enemies).toHaveLength(quantity);
    expect(enemies[0]).toBeInstanceOf(Snake);
  });
});