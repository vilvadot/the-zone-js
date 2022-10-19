import { EVENTS } from "./events.js";

const ACTIONS = {
  ArrowUp: "ArrowUp",
  ArrowDown: "ArrowDown",
  ArrowLeft: "ArrowLeft",
  ArrowRight: "ArrowRight",
  Space: "Space",
  KeyE: "KeyE",
};

export const INPUTS = {
  ...ACTIONS,
  Click: "Click",
};

export const isInputKey = (code) => INPUTS[code];
export const isActionKey = (code) => ACTIONS[code];

export const takeControlOfInputs = (bus) => {
  window.addEventListener("keydown", (event) => {
    if (isInputKey(event.code)) {
      event.preventDefault();
      bus.emit(EVENTS.INPUT_PRESSED, { key: INPUTS[event.code] });
      
      if (isActionKey(event.code))
        bus.emit(EVENTS.TURN_PASSED, { key: INPUTS[event.code] });
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
