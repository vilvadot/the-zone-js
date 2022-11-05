export const DEBUG_ENABLED = true

const DISPLAY_TEXT = "text";
const DISPLAY_TILES = "tiles";
const DISPLAY_MODE = DISPLAY_TILES;
// @ts-ignore
export const isTextMode = () => DISPLAY_MODE === DISPLAY_TEXT;

export const CELL_SIZE = 24;
export const WIDTH = Math.ceil(900 / CELL_SIZE)
export const HEIGHT = Math.ceil(600 / CELL_SIZE)

export const LIMIT = {
  enemies: 1,
  anomalies: 0
}