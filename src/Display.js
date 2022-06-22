const OPTIONS = {
  bg: "white",
  fg: "dimGrey",
  fontFamily: "Fira Mono",
  width: 30,
  height: 30,
  fontSize: 20,
  forceSquareRatio: true,
};

export const initDisplay = () => {
  const asciiDisplay = new ROT.Display(OPTIONS)

  const canvas = document.getElementById("game");
  canvas.appendChild(asciiDisplay.getContainer());

  return asciiDisplay
}

