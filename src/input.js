const Keys = {
  ArrowUp: Symbol("ArrowUp"),
  ArrowDown: Symbol("ArrowDown"),
  ArrowLeft: Symbol("ArrowLeft"),
  ArrowRight: Symbol("ArrowRight"),
  Space: Symbol("Space")
}

export const takeControlOfInputs = () => {
  window.addEventListener("keydown", (event) => {
    if (Keys[event.code]) event.preventDefault();
  });
}