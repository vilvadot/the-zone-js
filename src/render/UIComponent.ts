import { GameState } from "../Game.js";

export interface UIComponent {
  create: () => void;
  update: (gameState: GameState) => void;
}
