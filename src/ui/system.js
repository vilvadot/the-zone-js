import { PLAYER_ID } from "../entities/Player.js";
import { positionNodeInCanvas } from "../util.js";

export class UIRendering {
  static run(entities, turns) {
    const player = entities.find(({ id }) => id === PLAYER_ID);

    renderTurns(turns);
    renderHealth(player);
    entities.forEach((entity) => {
      renderHealthBar(entity);
    });
  }
}

const renderTurns = (turns) => {
  const $turnsCounter = findOrCreateNode("turns", "div", ".ui-bottom-bar");
  $turnsCounter.className = "ui-module";

  $turnsCounter.innerHTML = `Turns: ${turns}`;
};

const renderHealth = (player) => {
  if (!player) return;
  const currentValue = player.health.value;
  const maxValue = player.health.maxValue;

  const $health = findOrCreateNode("health", ".ui-bottom-bar");
  $health.className = "ui-module";

  $health.innerHTML = `Health: ${currentValue}/${maxValue}`;
};

const renderHealthBar = (entity) => {
  const id = `ui-health-${entity.id}`;
  if (!entity.health) return document.querySelector(`#${id}`)?.remove();

  const { value, maxValue } = entity.health;
  const { x, y } = entity.position;
  const width = 15;

  const $healthBar = findOrCreateNode(id, "#game");
  $healthBar.style = ` 
    position:absolute;
    background: lightgrey;
    width: ${width}px;
    height: 3px;
  `;
  $healthBar.className = "animate--movement";
  
  const $remaingHealthBar = findOrCreateNode(
    `ui-health--remaining-${id}`,
    `#${id}`
  );
  $remaingHealthBar.style = `
    width: ${width * (value/ maxValue)}px;
    background: green;
    height: 100%;
  `;

  positionNodeInCanvas($healthBar, x + 0.1, y - 0.1);
};

const findOrCreateNode = (id, parentSelector) => {
  const parent = document.querySelector(parentSelector);
  let node = document.querySelector(`#${id}`);

  if (!node) {
    node = document.createElement("div");
    node.id = id;
    parent.appendChild(node);
  }
  return node;
};
