import { impl, getRandomNumber } from "./stubs/random.ts";

// Show the stub implementation
console.log("Stub implementation:", impl);

// Show that getRandomNumber always returns 42
console.log("getRandomNumber result:", getRandomNumber(0, 100));

// Demonstrate how you could switch implementations
impl.getRandomNumber = () => 999;
console.log("After switching impl, getRandomNumber result:", getRandomNumber(0, 100)); 
