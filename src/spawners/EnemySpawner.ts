import { Snake, Enemy, PseudoDog, ENEMY} from "../entities/enemies/Enemy.js";
import { repeat, pickRandom } from "../util/index.js";
import { ENEMIES } from "../colors.js";

class EnemyFactory{
  static generate(mob){
    if(mob === ENEMY.dog) return new PseudoDog()
    return new Snake()
  }
}

export class EnemySpawner {
  static spawn(quantity = 1, mob: ENEMY = ENEMY.snake) {
    const result: Enemy[] = [];

    repeat(quantity, () => {
      const enemy = EnemyFactory.generate(mob)
      result.push(enemy);
    });

    return result;
  }

  static _generateColor() {
    return pickRandom(ENEMIES);
  }
}
