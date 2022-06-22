import { Drawing, canvasCoordinates } from "./Drawing";
import { Position, Sprite } from "../components";

describe("Drawing system", () => {
  it("only affects entities with position and sprite components", () => {
    const emptyEntity = new EntityWithoutComponents();

    const result = Drawing.run([emptyEntity]);

    // TODO: How do I test this?
  });

  it("draws a sprite in its position", () => {
    stubWorldDOM();
    const id = "myEntity";
    const tile = "X";
    const x = 10;
    const y = 10;
    const centeredEntity = new EntityAt(id, x, y, tile);

    Drawing.run([centeredEntity]);

    const sprite = document.querySelector(`#${id}`);
    expect(sprite.innerHTML).toEqual(tile)
    expect(sprite.getAttribute("style")).toEqual(
      `top: ${canvasCoordinates(x)}px; left: ${canvasCoordinates(y)}px;`
    );
  });
});

const stubWorldDOM = () => {
  const $game = document.createElement("div");
  $game.id = "game";
  document.body.appendChild($game);
};

class EntityAt {
  constructor(id, x, y, tile) {
    this.position = new Position(x, y);
    this.sprite = new Sprite(id, tile);
  }
}

class EntityWithoutComponents {
  constructor() {
    this.position = null;
    this.sprite = null;
  }
}
