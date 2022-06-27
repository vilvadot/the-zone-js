import { EVENTS } from "./events.js";

export const INPUTS = {
  ArrowUp: "ArrowUp",
  ArrowDown: "ArrowDown",
  ArrowLeft: "ArrowLeft",
  ArrowRight: "ArrowRight",
  Space: "Space",
  Click: "Click",
};

export const isInputKey = (code) => INPUTS[code];

export const takeControlOfInputs = (bus) => {
  window.addEventListener("keydown", (event) => {
    if (isInputKey(event.code)) {
      bus.emit(EVENTS.INPUT_PRESSED, { key: INPUTS[event.code] });
      bus.emit(EVENTS.TURN_PASSED, { key: INPUTS[event.code] });
      event.preventDefault();
    }
  });

  window.addEventListener("click", ({ clientX, clientY }) => {
    bus.emit(EVENTS.INPUT_PRESSED, {
      key: INPUTS["Click"],
      x: clientX,
      y: clientY,
    });
  });
};
