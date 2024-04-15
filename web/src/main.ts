import * as wasmModule from '../../assembly/build/release.wasm';
import { findNthPrime } from './findNthPrime';

const runTSbutton = document.querySelector('#run-ts') as HTMLButtonElement;
const tsOut = document.querySelector('#ts-out') as HTMLDivElement;

const runWAbutton = document.querySelector('#run-wa') as HTMLButtonElement;
const waOut = document.querySelector('#wa-out') as HTMLDivElement;

runTSbutton.addEventListener('click', () => {
  runTrial(findNthPrime, tsOut);
});

runWAbutton.addEventListener('click', () => {
  runTrial(wasmModule.findNthPrime, waOut);
});

const runTrial = (
  method: typeof wasmModule.findNthPrime | typeof findNthPrime,
  output: HTMLDivElement,
) => {
  const start = performance.now();
  const result = method(2000000);
  const end = performance.now();

  output.innerText = `Found ${result} after ${end - start}ms.`;
};

// ----

// This ?worker import is a weird thing that Vite does:
// https://v3.vitejs.dev/guide/features.html#web-workers
import MyWorker from './worker?worker';

const runWWbutton = document.querySelector('#run-ww') as HTMLButtonElement;
const wwOut = document.querySelector('#ww-out') as HTMLDivElement;

const worker = new MyWorker();

runWWbutton.addEventListener('click', () => {
  // we send a worker work with a postMessage
  worker.postMessage([2000000]);
});

// we receive the output back with onmessage
worker.onmessage = (evt) => {
  wwOut.innerText = evt.data;
};
