import { Player } from "../entities";
import { Health, Sprite } from "../components";
import { Death } from "./Death";

describe("Death system", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("ignores an entity with health above alive threshold", () => {
    const health = 10;
    const aliveEntity = new Entity(health);
    const game = gameStub();

    Death.run([aliveEntity], game);

    expect(game.kill).not.toHaveBeenCalled();
  });

  it("kills an with health bellow alive threshold", () => {
    const health = -1;
    const deadEntity = new Entity(health);
    const game = gameStub();

    Death.run([deadEntity], game);

    expect(game.kill).toHaveBeenCalledWith(deadEntity);
  });

  it("if player is killed it resets the game", () => {
    const player = new Player();
    player.health.value = 0;
    const game = gameStub();

    Death.run([player], game);

    expect(game.reset).toHaveBeenCalled();
  });
});

class Entity {
  constructor(health) {
    this.sprite = new Sprite();
    this.health = new Health(health);
  }
}

const gameStub = () => {
  return {
    kill: jest.fn(),
    reset: jest.fn(),
  };
};
