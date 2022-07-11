import { COLORS } from "./colors.js";


const fontSize = 20;
const width = window.innerWidth / fontSize - 1
const height = window.innerHeight / fontSize - 3

export const OPTIONS = {
  bg: COLORS.background,
  fontFamily: "Fira Mono",
  width,
  height,
  fontSize,
  forceSquareRatio: true,
};
