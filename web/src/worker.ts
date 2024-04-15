import { findNthPrime } from './findNthPrime';

//event.data is the information sent in the post message with the [2 million] then we get the 0th index of that
//for event.data
//whenever we want to have multiple values we need it in an array but in this case we could have just used the number 
onmessage = (evt) => {
  const start = performance.now();
  const result = findNthPrime(evt.data[0]);
  const end = performance.now();

  postMessage(`Found ${result} after ${end - start}ms.`);
};
