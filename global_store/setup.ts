import { Store } from "./store.ts";
import { getRandomNumber } from "./random.ts";

let initialized = false;

export default function initialize(): void {
  if (initialized) return;
  Store.initialize({ getRandomNumber });
  initialized = true;
} 
