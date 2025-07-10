import { Store } from "./store.ts";
import { getRandomNumber } from "./random.ts";
import initialize from "./setup.ts";

function getCoolness(name: string): number {
  const store = Store.getStore<{ getRandomNumber: typeof getRandomNumber }>();
  const rng = store.get().getRandomNumber;
  
  const scaleFactor = rng(0, name.length);
  const base = rng(0, 100);
  return base * scaleFactor;
}

export function hello(name: string): string {
  return `Hello, ${name}! ${getCoolness(name)}`;
}

if (import.meta.main) {
  initialize();
}
