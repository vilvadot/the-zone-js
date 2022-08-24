import { Enemy } from "../entities/Enemy";
import { EnemySpawner } from "./EnemySpawner";

describe("EnemySpawner", () => {
  it("spawns enemies", () => {
    const quantity = 3;

    const enemies = EnemySpawner.spawn(quantity);

    expect(enemies).toHaveLength(quantity);
    expect(enemies[0]).toBeInstanceOf(Enemy);
  });
});
