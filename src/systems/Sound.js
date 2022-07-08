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
  const context = new AudioContext();
  const oscillator = context.createOscillator();
  oscillator.type = "sine";

  const gain = context.createGain()
  oscillator.connect(gain);
  gain.connect(context.destination);

  oscillator.start();
  setTimeout(() => {
    oscillator.stop()
  }, 100);
};
