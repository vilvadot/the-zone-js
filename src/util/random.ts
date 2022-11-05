export const randomFloat = (min, max) => {
  return Math.random() * (max - min) + min;
};

export const randomInteger = (max = 0, min = 0) => {
  const randomNumber = Math.random() * (max - min + 1) + min;
  return parseInt(randomNumber.toString());
};

export const randomSign = (value) => {
  if (roll()) return value * -1;
  return value;
};

export const uid = () => Math.random().toString().replace(".", "");

export const pickRandom = (collection: any[] = []) => {
  const index = randomInteger(0, collection.length);
  return collection[index];
};

export const roll = (probability = 0.5) => {
  const diceRoll = Math.random();
  if (diceRoll <= probability) return true;
  return false;
};
