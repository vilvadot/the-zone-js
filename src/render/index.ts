import { isTextMode } from "../config.js";
import { GlyphRenderer } from "./GlyphRenderer.js";
import { TileRenderer } from "./TileRenderer.js";

export { TileRenderer } from "./TileRenderer.js";
export { UIRenderer } from "./UIRenderer.js";
export { Display } from "./Display.js";

export const render = (game, display, ui, animationQueue, mouse?) => {
    const { fov, terrain, entities, turn, area } = game.state;
  
    if (isTextMode()) {
      GlyphRenderer.run(display, fov, terrain, entities, mouse);
    } else {
      TileRenderer.run(display, fov, terrain, entities, animationQueue, mouse);
    }
  
    ui.update(entities, turn, area);
  };