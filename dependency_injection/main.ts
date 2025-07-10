import { getRandomNumber } from "./random.ts";

export function greeting(name: string, rng: typeof getRandomNumber = getRandomNumber): string {
  const randomNumber = rng(0, 100);
  return `Hello, ${name}! ${randomNumber}`;
}

export function hello(name: string, rng?: typeof getRandomNumber): string {
  return greeting(name, rng);
}

if (import.meta.main) {
  console.log(hello("Deno"));
}
