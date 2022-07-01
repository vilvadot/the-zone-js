import { PLAYER_ID } from "../entities/Player.js";

export class UIRendering {
  static run(entities, turns) {
    const player = entities.find(({ id }) => id === PLAYER_ID);

    renderTurns(turns);
    renderHealth(player);
  }
}

const renderTurns = (turns) => {
  const $turnsCounter = createModule('turns')
  
  $turnsCounter.innerHTML = `Turns: ${turns}`;
};

const renderHealth = (player) => {
  const currentValue = player.health.value;
  const maxValue = player.health.maxValue;

  const $health = createModule('health')

  $health.innerHTML = `Health: ${currentValue}/${maxValue}`
};

const createModule = (id) => {
  let $module = document.querySelector(`#${id}`)

  if(!$module){
    $module = document.createElement("p");
    $module.id = id
    $module.className = 'ui-module'
    appendToRightSidebar($module)
  }

  return $module
}

const appendToRightSidebar = ($module) => {
  const $rightUiArea = document.querySelector(".right-area");
  $rightUiArea.appendChild($module);
}