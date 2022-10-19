import { Game } from "./Game.js";
import { Bus } from "./infra/bus.js";
import { takeControlOfInputs } from "./input.js";
import { EVENTS } from "./events.js";
import { UIRenderer, TerrainRenderer, EntityRenderer, Display, } from "./render/index.js";

export const loadGame = () => {
    const bus = new Bus();
    const display = new Display();
    const game = new Game(bus);
    const ui = new UIRenderer(bus);
    takeControlOfInputs(bus);

    bus.subscribe(EVENTS.TURN_PASSED, (action) => {
        runTurn(action, game, display, ui);
    });

    runTurn(undefined, game, display, ui);
};

const runTurn = (action, game, display, ui) => {
    const { fov, terrain, entities, turn } = game.runMainLoop(action);
    TerrainRenderer.run(display, fov, terrain);
    EntityRenderer.run(entities, fov);
    ui.update(entities, turn);
};

window.onload = () => loadGame();
