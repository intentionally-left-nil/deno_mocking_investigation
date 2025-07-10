import { assertEquals } from "@std/assert";
import { stub } from "@std/testing/mock";
import { Store } from "./store.ts";
import { getRandomNumber } from "./random.ts";
import { hello } from "./main.ts";
import initialize from "./setup.ts";

Deno.test("hello() should return greeting with mocked random values", async (t) => {
  initialize();
  
  const fakeRng = (min: number, max: number) => {
    if (max <= 4) return 2;
    if (max <= 100) return 50;
    return 0;
  };
  
  const store = Store.getStore<{ getRandomNumber: typeof getRandomNumber }>();
  const storeData = store.get();
  
  using _randomStub = stub(storeData, "getRandomNumber", fakeRng);

  const result = hello("Deno");
  assertEquals(result, "Hello, Deno! 100");
});
