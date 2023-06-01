export const generateRandomValue = (min:number, max: number, numAfterDigit = 0) =>
  +((Math.random() * (max - min)) + min).toFixed(numAfterDigit);

export const getRandomItem = <T>(items: T[]):T =>
  items[generateRandomValue(0, items.length - 1)];

export const generateRandomString = (min:number, max: number) => {
  const strLength = generateRandomValue(min, max);
    let rnd = '';
    while (rnd.length < strLength) 
        rnd += Math.random().toString(36).substring(2);
    return rnd.substring(0, strLength);
};