import { Snake, Enemy, PseudoDog, ENEMY } from "../entities/enemies/Enemy.js";
import { repeat, pickRandom } from "../util/index.js";
import { ENEMIES } from "../colors.js";

class EnemyFactory {
  static generate(mob) {
    if (mob === ENEMY.dog) return new PseudoDog()
    return new Snake()
  }
}

export class EnemySpawner {
  static spawn(seed: string) {
    const result: Enemy[] = [];
    const {quantity, mobType} = this.parseSeed(seed)

    repeat(quantity, () => {
      const enemy = EnemyFactory.generate(mobType)
      result.push(enemy);
    });

    return result;
  }

  private static parseSeed(seed) {
    const quantity = Number(seed[0]);
    const mobType = Number(seed[1]) % 2 === 0 ? ENEMY.snake : ENEMY.dog;
    return { quantity, mobType }
  }

  static _generateColor() {
    return pickRandom(ENEMIES);
  }
}
