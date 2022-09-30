export const BLOCKING_TILES = {
  wall: "◻︎",
  wallWood: "⚀",
}

export const isBlockingTile = (tile) => {
  return Object.values(BLOCKING_TILES).includes(tile)
}

export const TILES = {
  ...BLOCKING_TILES,
  empty: "",
  dirt: ".",
  grass: ",",
  anomaly: "☸︎",
  player: "@",
  corpse: "X",
  enemy: "E",
};

