import { describe, expect, it, beforeEach } from 'vitest'
import { ENEMY, PseudoDog, Snake } from "../entities/enemies/Enemy.js";
import { EnemySpawner } from "./EnemySpawner.js";

describe("EnemySpawner", () => {
  const seed = '123';

  it("spawns snakes", () => {
    const enemies = EnemySpawner.spawn(seed);

    expect(enemies[0]).toBeInstanceOf(Snake);
  });

  it("spawns pseudodogs", () => {
    const enemies = EnemySpawner.spawn(seed, ENEMY.dog);

    expect(enemies[0]).toBeInstanceOf(PseudoDog);
  });
});