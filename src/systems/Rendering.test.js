import { Rendering } from "./Rendering";
import { Position, Sprite } from "../components";
import { canvasCoordinates } from "../util";

describe("Rendering system", () => {
  let sprite;
  afterEach(() => {
    sprite.remove();
  });
  it("draws a sprite in its position", () => {
    stubWorldDOM();
    const id = "myEntity";
    const tile = "X";
    const x = 10;
    const y = 10;
    const centeredEntity = new EntityAt(id, x, y, tile);

    Rendering.run([centeredEntity]);

    sprite = document.querySelector(`#${id}`);
    expect(sprite.innerHTML).toEqual(tile);
    expect(sprite.title).toEqual(centeredEntity.name);
    expect(sprite.getAttribute("style")).toContain(
      `top: ${canvasCoordinates(x)}px`
    );
    expect(sprite.getAttribute("style")).toContain(
      `left: ${canvasCoordinates(y)}px;`
    );
  });

  it("hides hidden sprites", () => {
    stubWorldDOM();
    const id = "myEntity";
    const entity = new EntityAt(id, 10, 10, "X");
    entity.sprite.isHidden = true;

    Rendering.run([entity]);

    sprite = document.querySelector(`#${id}`);
    expect(sprite.getAttribute("style")).toContain(`display: none`);
  });
});

const stubWorldDOM = () => {
  const $game = document.createElement("div");
  $game.id = "game";
  document.body.appendChild($game);
};

class EntityAt {
  constructor(id, x, y, tile) {
    this.id = id;
    this.name = "entityName";
    this.position = new Position(x, y);
    this.sprite = new Sprite(id, tile);
  }
}
