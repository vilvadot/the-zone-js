import { Enemy } from "../entities/Enemy";
import { EnemySpawner } from "./EnemySpawner";

describe("Enemy Spawner", () => {
  it("spawns enemies", () => {
    const quantity = 3;

    const enemies = EnemySpawner.spawn(quantity);

    expect(enemies).toHaveLength(quantity);
    expect(enemies[0]).toBeInstanceOf(Enemy);
  });

  it("[RANDOM] enemies spawned have different colors", () => {
    const enemies = EnemySpawner.spawn(100);

    const uniqueColors = getUniqueColors(enemies)
    
    expect(uniqueColors.size).toBeGreaterThan(1)
  });
});

const getUniqueColors = (enemies) => {
  const result = new Set();
  enemies.forEach((enemy) => {
    result.add(enemy.sprite.color);
  });

  return result
};
