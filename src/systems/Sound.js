import { EVENTS } from "../events.js";

export class Sound {
  constructor(bus) {
    this.bus = bus;
    this._subscribeToEvents();
  }

  _subscribeToEvents() {
    this.bus.subscribe(EVENTS.ATTACK_HIT, () => {
      beep();
    });
  }
}

const beep = () => {
  var context = new AudioContext();
  var oscillator = context.createOscillator();
  oscillator.type = "sine";
  oscillator.connect(context.destination);
  oscillator.start();
  setTimeout(() => {
    oscillator.stop()
  }, 100);
};
