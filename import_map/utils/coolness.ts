import { getRandomNumber } from "../random.ts";

export function getCoolness(name: string): number {
  const scaleFactor = getRandomNumber(0, name.length);
  const base = getRandomNumber(1, 10);
  return base * scaleFactor;
} 
