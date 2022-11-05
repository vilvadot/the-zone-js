import { GLYPHS, GLYPH_COLORS } from "../glyphs.js";
import { TILES } from "../tiles.js";
import { shadowMagnitude } from "./shadowMagnitude.js";

const DEBUG_COLOR = "red";

export class GlyphRenderer {
  static run(display, fov, terrain, entities, mouse?) {
    fov.forEach((x, y, distance) => {
      const isMouseHover = x === mouse?.x && y === mouse?.y;
      const { glyph, color } = getGlyph(entities, terrain, x, y)
      
      display.draw(x, y, glyph, color || DEBUG_COLOR);
    });
  }
}

const getGlyph = (entities, terrain, x, y) => {
  const entityGlyph = getEntityGlyph(entities, x, y);
  if(entityGlyph.glyph) return entityGlyph;


  return getTerrainGlyph(terrain, x, y)
}

const getEntityGlyph = (entities, x, y) => {
  const entity = entities.find(
    ({ position }) => position.x === x && position.y === y
  );
  const sprite = entity?.sprite?.name;
  const glyph = GLYPHS[sprite];
  const color = GLYPH_COLORS[sprite];

  return { glyph, color };
};

const getTerrainGlyph = (terrain, x, y) => {
  const sprite = terrain.getTileAt(x, y);
  const glyph = GLYPHS[sprite];
  const color = GLYPH_COLORS[sprite];

  return { glyph, color };
};