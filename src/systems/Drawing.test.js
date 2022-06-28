import { Rendering, canvasCoordinates } from "./Rendering";
import { Position, Sprite } from "../components";

describe("Rendering system", () => {
  it("draws a sprite in its position", () => {
    stubWorldDOM();
    const id = "myEntity";
    const tile = "X";
    const x = 10;
    const y = 10;
    const centeredEntity = new EntityAt(id, x, y, tile);

    Rendering.run([centeredEntity]);

    const sprite = document.querySelector(`#${id}`);
    expect(sprite.innerHTML).toEqual(tile)
    expect(sprite.getAttribute("style")).toContain(`top: ${canvasCoordinates(x)}px`)
    expect(sprite.getAttribute("style")).toContain(`left: ${canvasCoordinates(y)}px;`)
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