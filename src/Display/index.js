import {OPTIONS} from '../config.js'

export const initDisplay = () => {
  const asciiDisplay = new ROT.Display(OPTIONS)

  const canvas = document.getElementById("game");
  canvas.appendChild(asciiDisplay.getContainer());

  return asciiDisplay
}