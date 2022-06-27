export class UIRendering {
  static run(entities, turns) {
    const $turnsCounter = document.querySelector("#turns");
    $turnsCounter.innerHTML = turns;
  }
}
