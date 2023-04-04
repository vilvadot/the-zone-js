export class GameMode {
  mode: Mode;

  constructor() {
    this.mode = Mode.movement;
  }

  isTalking() {
    return this.mode === Mode.dialog;
  }

  toggleDialog() {
    if (this.mode === Mode.dialog)
      return (this.mode = Mode.movement);
    this.mode = Mode.dialog;
  }
}

export enum Mode {
  dialog = "DIALOG",
  aiming = "AIMING",
  movement = "MOVEMENT",
}
