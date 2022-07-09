import { EVENTS } from "../events.js";

export class Sound {
  constructor(bus) {
    this.bus = bus;
    this._subscribeToEvents();
    // setInterval(() => {
    //   geiger()
    // }, 100)
  }

  _subscribeToEvents() {
    this.bus.subscribe(EVENTS.ATTACK_HIT, () => {
      beep();
    });
  }
}

const geiger = () => {
  const context = new AudioContext();
  const oscillator = context.createOscillator();
  oscillator.frequency.value = 500.0
  oscillator.type = "square";

  const gain = context.createGain()
  oscillator.connect(gain);
  gain.connect(context.destination);

  oscillator.start();
  setTimeout(() => oscillator.stop(), 20)
};

const beep = () => {
  const context = new AudioContext();
  const oscillator = context.createOscillator();
  oscillator.frequency.value = 90.0
  oscillator.type = "triangle";

  const gain = context.createGain()
  oscillator.connect(gain);
  gain.connect(context.destination);

  oscillator.start();
  setTimeout(() => {
    oscillator.stop()
  }, 100);
};
