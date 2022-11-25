import { describe, expect, it, beforeEach } from 'vitest'
import { ENEMY, PseudoDog, Snake } from "../entities/enemies/Enemy.js";
import { EnemySpawner } from "./EnemySpawner.js";

describe("EnemySpawner", () => {
  it("spawns snakes", () => {
    const quantity = 3;

    const enemies = EnemySpawner.spawn(quantity);

    expect(enemies).toHaveLength(quantity);
    expect(enemies[0]).toBeInstanceOf(Snake);
  });

  it("spawns pseudodogs", () => {
    const quantity = 3;

    const enemies = EnemySpawner.spawn(quantity, ENEMY.dog);

    expect(enemies).toHaveLength(quantity);
    expect(enemies[0]).toBeInstanceOf(PseudoDog);
  });
});