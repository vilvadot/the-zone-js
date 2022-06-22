import { EVENTS } from "./events.js";

export const INPUTS = {
  ArrowUp: "ArrowUp",
  ArrowDown: "ArrowDown",
  ArrowLeft: "ArrowLeft",
  ArrowRight: "ArrowRight",
  Space: "Space"
}

export const isInputKey = (code) => INPUTS[code]

export const takeControlOfInputs = (bus) => {
  window.addEventListener("keydown", (event) => {
    if (isInputKey(event.code)) {
      bus.emit(EVENTS.INPUT_PRESSED, INPUTS[event.code])
      event.preventDefault();
    }
  });
}