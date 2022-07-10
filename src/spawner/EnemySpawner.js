import { Enemy } from "../entities/Enemy.js";
import { repeat } from "../util";

export class EnemySpawner {
  static spawn(quantity = 1) {
    const result = [];

    repeat(quantity, () => {
      result.push(new Enemy());
    });

    return result;
  }
}
