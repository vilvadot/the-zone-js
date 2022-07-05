import { PLAYER_ID } from "../entities/Player.js";
import { positionNodeInCanvas } from "../util.js";
import { EVENTS } from "../events.js";
import { COLORS } from "../tiles.js";

export class UIRendering {
  constructor(bus, entities){
    this.bus = bus;
    this.turn = 0;
    this._asyncSubscriptions()
  }

  _asyncSubscriptions(){
    this.bus.subscribe(EVENTS.LOG_EMITTED, ({ message, color }) => {
      const $logs = document.querySelector("#ui-log")
      
      const $message = createNode({
        type: 'span',
        className: "ui_log-message",
        style: `color: ${color}`,
        content: message
      })

      const $line = createNode({type: 'p'})
      $line.appendChild($message)

      $logs.prepend($line)
    })
  }

  update(entities, turn) {
    this.turn = turn;
    const player = entities.find(({ id }) => id === PLAYER_ID);

    renderTurns(turn);
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
    background: ${COLORS.health};
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


const createNode = ({ type, className, content, style }) => {
  const node = document.createElement(type)
  if(className) node.className = className
  if(content) node.innerHTML = content
  if(style) node.style = style

  return node
}