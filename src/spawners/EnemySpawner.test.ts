import { describe, expect, it, beforeEach } from "vitest";
import { EnemySpawner } from "./EnemySpawner.js";

describe("EnemySpawner", () => {
  it("spawns snakes", () => {
    const enemies = new EnemySpawner().spawn(100);

    const enemyNames = enemies.map((enemy) => enemy.name);
    expect(enemyNames).toContain("snake");
  });

  it("spawns pseudodogs", () => {
    const enemies = new EnemySpawner().spawn(100);

    const enemyNames = enemies.map((enemy) => enemy.name);
    expect(enemyNames).toContain("pseudo dog");
  });
});
