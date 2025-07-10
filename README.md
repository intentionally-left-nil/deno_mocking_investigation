# Deno Mocking Investigation
Each project implements the same core functionality - a greeting function that uses a random number generator - but employs different mocking techniques for testing. The goal is to compare and contrast these approaches to understand their trade-offs, benefits, and challenges.

## Getting Started

### Prerequisites

- [Deno](https://deno.land/) installed 

### Installation

```bash
git clone git@github.com:intentionally-left-nil/deno_mocking_investigation.git
cd deno_mocking_investigation
```

## Running Tests
Each project is demonstrated by running the unit tests. To do so, cd into each sub-directory, and run `deno test`

** Important **: For the import_map sub-directory, you need to run `deno task test`


```bash
cd <project-directory>
deno test
```

To run examples with real random numbers:

```bash
cd <project-directory>
deno run main.ts
```

## Projects

### 1. Dependency Injection (`dependency_injection/`)

A straightforward, but tedious approach to mocking is to modify the prod code to have additional input for anything that needs to be mocked. For example: `myFunction(opts: { getRandomNumber })` makes it straightforward for the test code to replace getRandomNumber with another implementation.

The downside of this approach is very similar to prop drilling in React. Side effects become infectious and all callers start having to include extra arguments so the functions can be passed downwards. In these scenarios, it also becomes brittle if the same mock needs to behave differently depending on who is calling it.

```typescript
// Production code
export function greeting(name: string, rng: typeof getRandomNumber = getRandomNumber): string {
  const randomNumber = rng(0, 100);
  return `Hello, ${name}! ${randomNumber}`;
}

// Test code
const fakeRng = (min: number, max: number) => 42;
assertEquals(hello("Deno", fakeRng), "Hello, Deno! 42");
```

### 2. Global Store (`global_store/`)

This approach uses a global store to hold function implementations, allowing runtime replacement without modifying function signatures. Think of it as a dependency injection container that's globally accessible.

The key insight is that you can swap implementations at runtime, but you need to be careful about initialization order. If code tries to access a function before it's been set in the store, you'll get runtime errors that TypeScript can't catch.

```typescript
// Production code
function getCoolness(name: string): number {
  const store = Store.getStore<{ getRandomNumber: typeof getRandomNumber }>();
  const rng = store.get().getRandomNumber; // Could fail if not initialized
  return rng(0, 100);
}

// Test code
const store = Store.getStore<{ getRandomNumber: typeof getRandomNumber }>();
using _randomStub = stub(store.get(), "getRandomNumber", fakeRng);
```

### 3. Global This (`global_this/`)

The simplest approach - just shove functions onto `globalThis` and access them from anywhere. However, we've replaced one side-effect problem with another (polluting and populating globalThis). Additional problems of initializing-in-time, and not overwriting properties with the same name become an issue with this approach

```typescript
// Production code
declare global {
  var getRandomNumber: (min: number, max: number) => number;
}

function getCoolness(name: string): number {
  const rng = globalThis.getRandomNumber; // Could be undefined!
  return rng(0, 100);
}

// Test code
globalThis.getRandomNumber = fakeRng; // Direct replacement
```

### 4. Import Map (`import_map/`)

This leverages Deno's import map feature to swap out the import statements directly with the stub implementation. Unlike NodeJS, this happens one-time, globally across all imports. This is a permanent swap and lasts for the lifetime of the tests. 

// Test setup
const importMap = {
  imports: {
    "./random.ts": "./stubs/random.ts" // Redirects to mock
  }
};
```
Running the unit tests requires passing in an extra `--import-map` argument. This is problematic for deno monorepos, since that also affects the import map for all sub-projects. It also is a challenge to keep the import map in sync with the one in deno.json, since this fully overrides the map.
