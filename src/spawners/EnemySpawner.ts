import { HEIGHT, WIDTH } from "../config.js";
import { Snake, Enemy, ENEMY } from "../entities/enemies/Enemy.js";
import { PseudoDog } from "../entities/enemies/PseudoDog.js";
import { repeat, pickRandom, randomInteger } from "../util/index.js";
import { Spawner } from "./index.js";

class EnemyFactory {
  static generate(type: ENEMY) {
    const x = randomInteger(WIDTH);
    const y = randomInteger(HEIGHT);

    if (type === ENEMY.dog) return new PseudoDog(x, y);
    return new Snake(x, y);
  }
}

export class EnemySpawner implements Spawner<Enemy> {
  spawn(quantity = 10) {
    const result: Enemy[] = [];

    repeat(quantity, () => {
      const mobType = pickRandom([ENEMY.dog, ENEMY.snake]);
      const enemy = EnemyFactory.generate(mobType);

      result.push(enemy);
    });

    return result;
  }
}
