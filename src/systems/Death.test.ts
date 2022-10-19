import { describe, expect, it, afterEach, vi } from 'vitest'
import { Health, Sprite } from "../components/index.js";
import { Death } from "./Death.js";

describe("Death system", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it("ignores an entity with health above alive threshold", () => {
    const health = 10;
    const aliveEntity = new Entity(health);
    const entityManager = entityManagerStub();

    Death.run([aliveEntity], entityManager);

    expect(entityManager.kill).not.toHaveBeenCalled();
  });

  it("kills an with health bellow alive threshold", () => {
    const health = -1;
    const deadEntity = new Entity(health);
    const entityManager = entityManagerStub();

    Death.run([deadEntity], entityManager);

    expect(entityManager.kill).toHaveBeenCalledWith(deadEntity);
  });
});

class Entity {
  constructor(health) {
    this.sprite = new Sprite();
    this.health = new Health(health);
  }
}

const entityManagerStub = () => {
  return {
    kill: vi.fn(),
  };
};
