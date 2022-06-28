export class UIRendering {
  static run(turns) {
    const $turnsCounter = document.querySelector("#turns");
    $turnsCounter.innerHTML = turns;
  }
}
