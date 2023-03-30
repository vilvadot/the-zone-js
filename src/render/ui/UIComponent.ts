import { GameState } from "../../Game.js";

export interface UIComponent {
  node: HTMLElement;
  
  create: () => void;
  update: (gameState: GameState) => void;
}
