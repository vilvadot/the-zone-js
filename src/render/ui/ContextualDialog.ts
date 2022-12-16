import { GameMode } from "../../GameMode";

export class ContextualDialog {
  static update(mode: GameMode) {
    const $container = document.querySelector("#contextual-layer") as HTMLDivElement;

    if(mode.isDialog()){
      $container.style.visibility = "visible";
    }else{
      $container.style.visibility = "hidden";
    }
  }
}
