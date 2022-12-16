import { AnimationQueue } from "../animations/AnimationQueue.js";
import { isTextMode } from "../config.js";
import { Game } from "../Game.js";
import { Display } from "./Display.js";
import { GlyphRenderer } from "./GlyphRenderer.js";
import { TileRenderer } from "./TileRenderer.js";
import { UIRenderer } from "./UIRenderer.js";

export const render = (game: Game, display: Display, ui: UIRenderer, animationQueue: AnimationQueue, mouse?) => {
  const { fov, terrain, entities, turn, coordinates, player } = game.state;

  if (isTextMode()) {
    GlyphRenderer.run(display, fov, terrain, entities, mouse);
  } else {
    TileRenderer.run(display, fov, terrain, entities, animationQueue, mouse);
  }

  ui.update(player, turn, coordinates);
};