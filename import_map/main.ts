import { getRandomNumber } from "./random.ts";
import { getCoolness } from "./utils/coolness.ts";

export function greeting(name: string, rng: typeof getRandomNumber = getRandomNumber): string {
  const randomNumber = rng(0, 100);
  return `Hello, ${name}! ${randomNumber}`;
}

export function hello(name: string, rng?: typeof getRandomNumber): string {
  return greeting(name, rng);
}

export function coolHello(name: string): string {
  const coolness = getCoolness(name);
  return `Hello, ${name}! Your coolness level is ${coolness}`;
}

if (import.meta.main) {
  console.log(hello("Deno"));
  console.log(coolHello("Deno"));
}
