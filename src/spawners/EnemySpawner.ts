import { Snake, Enemy, PseudoDog, ENEMY } from "../entities/enemies/Enemy.js";
import { repeat, pickRandom } from "../util/index.js";
import { ENEMIES } from "../colors.js";

class EnemyFactory {
  static generate(mob) {
    if (mob === ENEMY.dog) return new PseudoDog(10, 10)
    return new Snake(5, 5)
  }
}

export class EnemySpawner {
  static spawn(seed: string) {
    const result: Enemy[] = [];
    const { quantity, mobType } = this.parseSeed(seed)

    repeat(quantity, () => {
      const enemy = EnemyFactory.generate(mobType)
      result.push(enemy);
    });

    return result;
  }

  private static parseSeed(seed) {
    const cleanSeed = seed.replace("-", "")
    const quantity = Number(cleanSeed[0]) || 1;
    const mobType = Number(cleanSeed[1]) % 2 === 0 ? ENEMY.snake : ENEMY.dog;

    return { quantity, mobType }
  }

  static _generateColor() {
    return pickRandom(ENEMIES);
  }
}
