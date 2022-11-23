export const BLOCKING_TILES = {
  rock: "rock",
  woodWall: "wood_wall",
}

export const isBlockingTile = (tile) => {
  return Object.values(BLOCKING_TILES).includes(tile)
}

export const TILES = {
  ...BLOCKING_TILES,
  empty: "empty",
  dirt: "dirt",
  grass: "grass",
  anomaly: "anomaly",
  player: "player",
  corpse: "corpse",
  enemy: "enemy",
  plank: "plank",
  hit: "hit",
  bullet: "bullet"
};

