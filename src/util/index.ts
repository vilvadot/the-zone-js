export const repeat = (times, callback) => {
  for (let i = 0; i < times; i++) {
    callback();
  }
};

export const capitalize = (string) => {
  return `${string[0].toUpperCase()}${string.slice(1)}`;
};

export * from "./dom.js";
export * from "./random.js";
export * from "./coordinates.js";
export * from "./Chance.js";
