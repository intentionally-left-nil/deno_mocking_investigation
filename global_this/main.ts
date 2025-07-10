declare global {
  // Since we are shoving extra data into this,
  // we need to add the type hints so that typescript knows about it
  // You'll notice that typescript won't be able to catch use-before-initialize bugs
  // because this declaration implies that getRandomNumber is always defined
  // however, it's up to us to ensure that we set it up before it's used
  var getRandomNumber: (min: number, max: number) => number;
}

function getRandomNumber(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getCoolness(name: string): number {
  const rng = globalThis.getRandomNumber;
  
  const scaleFactor = rng(0, name.length);
  const base = rng(0, 100);
  return base * scaleFactor;
}

export function hello(name: string): string {
  return `Hello, ${name}! ${getCoolness(name)}`;
}

if (import.meta.main) {
  globalThis.getRandomNumber = getRandomNumber;
  console.log(hello("Deno"));
}
