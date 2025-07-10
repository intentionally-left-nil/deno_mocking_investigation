export const impl = {
  getRandomNumber: (min: number, max: number) => 42,
};

export const getRandomNumber = (...args: Parameters<typeof impl.getRandomNumber>) => impl.getRandomNumber(...args); 
