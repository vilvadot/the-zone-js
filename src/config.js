import { COLORS } from "./colors.js";

export let DEBUG_ENABLED = false

const fontSize = 20;
const width = window.innerWidth / fontSize - 1
const height = window.innerHeight / fontSize - 3

export const LIMIT = {
  enemies: 10,
  anomalies: 5
}

export const OPTIONS = {
  bg: COLORS.background,
  fontFamily: "Fira Mono",
  width,
  height,
  fontSize,
  forceSquareRatio: true,
};
