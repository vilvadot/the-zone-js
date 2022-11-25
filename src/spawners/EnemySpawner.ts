import { Snake, Enemy} from "../entities/enemies/Enemy.js";
import { repeat, pickRandom } from "../util/index.js";
import { ENEMIES } from "../colors.js";

export class EnemySpawner {
  static spawn(quantity = 1) {
    const result: Enemy[] = [];

    repeat(quantity, () => {
      result.push(new Snake());
    });

    return result;
  }

  static _generateColor() {
    return pickRandom(ENEMIES);
  }
}
