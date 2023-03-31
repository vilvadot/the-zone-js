import { describe, expect, it, afterEach, vi } from 'vitest'
import { Health, Sprite } from "../components/index.js";
import { EntityManager } from '../entities/entity-manager.js';
import { Bus } from '../infra/bus.js';
import { Terrain } from '../terrain/Terrain.js';
import { Death } from "./Death.js";

vi.mock('../entities/entity-manager.js')

describe("Death system", () => {
  const entityManager = new EntityManager(new Bus(), new Terrain(1, 1))

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("ignores an entity with health above alive threshold", () => {
    const health = 10;
    const aliveEntity = new Entity(health);

    Death.run([aliveEntity], entityManager);

    expect(entityManager.remove).not.toHaveBeenCalled();
  });

  it("kills an with health bellow alive threshold", () => {
    const health = -1;
    const deadEntity = new Entity(health);

    Death.run([deadEntity], entityManager);

    expect(entityManager.remove).toHaveBeenCalledWith(deadEntity);
  });
});

class Entity {
  sprite: Sprite;
  health: Health;

  constructor(health) {
    this.sprite = new Sprite();
    this.health = new Health(health);
  }
}