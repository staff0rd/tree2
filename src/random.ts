export const between = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

export const pick = <T>(array: T[]) => array[between(0, array.length - 1)];
