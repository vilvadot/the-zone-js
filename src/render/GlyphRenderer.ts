import { DEBUG_ENABLED } from "../config.js";
import { GLYPHS, GLYPH_COLORS } from "../glyphs.js";

const DEBUG_COLOR = "red";

export class GlyphRenderer {
  static run(display, fov, terrain, entities, mouse?) {
    display.clear();
    fov.forEach((x, y, { isBlocked }) => {
      const { glyph, color } = getGlyph(entities, terrain, x, y, isBlocked)

      display.draw(x, y, glyph, color || DEBUG_COLOR);
    });
  }
}

const EMPTY_GLYPH = { glyph: "", color: "black" }

const getGlyph = (entities, terrain, x, y, isBlocked) => {
  if (isBlocked && !DEBUG_ENABLED) return EMPTY_GLYPH
  const entityGlyph = getEntityGlyph(entities, x, y);
  if (entityGlyph.glyph) return entityGlyph;


  return getTerrainGlyph(terrain, x, y)
}

const getEntityGlyph = (entities, x, y) => {
  const entity = entities.find(
    ({ position }) => position.x === x && position.y === y
  );
  const sprite = entity?.sprite?.name;

  const isInvisible = entity?.isInvisible && !DEBUG_ENABLED
  const glyph = !isInvisible ? GLYPHS[sprite] : "";
  const color = GLYPH_COLORS[sprite];

  return { glyph, color };
};

const getTerrainGlyph = (terrain, x, y) => {
  const sprite = terrain.getTileAt(x, y);
  const glyph = GLYPHS[sprite];
  const color = GLYPH_COLORS[sprite];

  return { glyph, color };
};