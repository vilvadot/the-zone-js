const emoji = {
  wall: "◻︎",
  empty : ".",
  enemy: "😈",
  corpse: "💀",
  player: "🐸"
}

const ascii = {
  wall: "◻︎",
  empty : ".",
  player: "@",
  corpse: "X",
  enemy: "E"
}

export const TILES = ascii

export const COLORS = {
  [TILES.empty]: "#e06464",
  [TILES.wall]: "#970000",
  [TILES.player]: "blue",
  [TILES.enemy]: "Gold",
  [TILES.corpse]: "black",
  'background': "LightCoral",
};
