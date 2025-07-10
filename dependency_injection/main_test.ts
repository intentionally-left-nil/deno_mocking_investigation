import { assertEquals } from "@std/assert";

import {hello} from "./main.ts";

Deno.test("hello, mocking greeting via dependency injection", () => {
  const fakeRng = (min: number, max: number) => 42;
  assertEquals(hello("Deno", fakeRng), "Hello, Deno! 42");
})
