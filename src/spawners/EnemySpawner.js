import { Enemy } from "../entities/Enemy.js";
import { repeat, pickRandom } from "../util.js";
import { ENEMIES } from "../colors.js";

export class EnemySpawner {
  static spawn(quantity = 1) {
    const result = [];

    repeat(quantity, () => {
      const color = this._generateColor();
      result.push(new Enemy({ color }));
    });

    return result;
  }

  static _generateColor() {
    return pickRandom(ENEMIES);
  }
}
