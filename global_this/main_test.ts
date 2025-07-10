import { assertEquals } from "@std/assert";
import { stub } from "@std/testing/mock";
import { hello } from "./main.ts";

Deno.test("hello() should return greeting with mocked globalThis.getRandomNumber", () => {
  const fakeRng = (_min: number, max: number) => {
    if (max <= 4) return 2;
    if (max <= 100) return 50;
    return 0;
  };
  
  globalThis.getRandomNumber = fakeRng;

  const result = hello("Deno");
  assertEquals(result, "Hello, Deno! 100");
});

Deno.test("hello() should return greeting with stubbed Math.random", () => {
  const fakeMathRandom = () => 0.5;
  
  using _mathRandomStub = stub(Math, "random", fakeMathRandom);

  const result = hello("Deno");
  assertEquals(result, "Hello, Deno! 100");
});
