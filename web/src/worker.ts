import { findNthPrime } from './findNthPrime';

onmessage = (evt) => {
  const start = performance.now();
  const result = findNthPrime(evt.data[0]);
  const end = performance.now();

  postMessage(`Found ${result} after ${end - start}ms.`);
};
