import { describe, expect, it, beforeEach } from 'vitest'
import { Enemy } from "../entities/Enemy.js";
import { EnemySpawner } from "./EnemySpawner.js";

describe("EnemySpawner", () => {
  it("spawns enemies", () => {
    const quantity = 3;

    const enemies = EnemySpawner.spawn(quantity);

    expect(enemies).toHaveLength(quantity);
    expect(enemies[0]).toBeInstanceOf(Enemy);
  });
});