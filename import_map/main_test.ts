import { assertEquals } from "@std/assert";
import { hello } from "./main.ts";

Deno.test("hello function with real random", () => {
  const result = hello("Test");
  assertEquals(result.startsWith("Hello, Test!"), true);
});

Deno.test("hello function with stubbed random (import map)", () => {
  // When the import map redirects ./random.ts to ./stubs/random.ts,
  // getRandomNumber always returns 42.
  const result = hello("Deno");
  assertEquals(result, "Hello, Deno! 42");
});
