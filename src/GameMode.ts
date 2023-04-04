export class GameMode {
  name: Mode;

  constructor() {
    this.name = Mode.movement;
  }

  isAiming(){
    return this.name === Mode.aiming;
  }

  isMovement() {
    return this.name === Mode.movement;
  }

  isDialog() {
    return this.name === Mode.dialog;
  }

  toggleDialog() {
    if (this.name === Mode.dialog)
      return (this.name = Mode.movement);
    this.name = Mode.dialog;
  }
}

export enum Mode {
  dialog = "DIALOG",
  aiming = "AIMING",
  movement = "MOVEMENT",
}
