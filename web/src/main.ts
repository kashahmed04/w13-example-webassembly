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

/**
 * NEW NOTES:
 * 
 * web assbelmy is a way to write C, C++, etc. to run in web browsers
 * 
 * web assembly is not assemnly but its lifelike what's different with JS it's a just in time compiled and web assembly is
 * binary format and sent to the brwpser automatically
 * 
 * it's a near native preformanace we can run on the web
 * 
 * web assembly can run with web assembley and JS cn call web assembly things and web assembly things can call JS things
 * 
 * the web assembly module loads in as a module then we have access to memeory, table (lookup of memeory), and lookup of module
 * (or web assembly)
 * 
 * if we write in c or c++ we use insctipin to convert to web assembly or we could write it ourself in binary (machine level)
 * 
 * we can write a rest applicaiton and can set web assembly as the target
 * 
 * and unity uses web assembly for WebGL
 * 
 * assembly script is like TS but converts to binary from TS and this one was chosen because it runs vite and npm start (it works
 * locally as well)
 * 
 * implement a function that lets us find the nth prime (example finds 2 millionth prime and finds out how long it takes
 * to find it for performance)
 * 
 * performance.now() gives us DOM high stamp res stemp and it's accurate to 5 micro seconds (very sepecific)
 * we do thid at start and do it at the end of out code then subtract end-start to find out how long the o[eration took
 * 
 * we use performance API to measure how long it takes the 2 millionth prime number for each type
 * 
 * the browser feezes when and instead we can use web workers to put that work onto another thread and geta message when it's done to
 * solve the problem
 * 
 * README:
 * 
 * similar to work with web sockets and has 2 projects in the same project (assembly has assembly code and the other has
 * web directy which runs the web assembly code)(we have to have 2 npm windows and start each project in 2 tabs to work in 1 tab)
 * (could we use concurrently with this to run 2 commands or no)**
 * 
 * PACKGE.JSON:
 * 
 * gives us assembly script and the asconfig tells us what we are about the build and where it goes
 * 
 * INDEX.TS:
 * 
 * looks like TS but we compile it down into web assembly (find nth prime is the function that gets imported)
 * 
 * we run a command which will build the assembly that that file won't be empty anymore**
 * 
 * our build folder then gets fikes when we run the command in npm and the debug is used for and the release is for 
 * 
 * release.d.TS tells us what the function looks like and 
 * the release.JS compiles the module and gets it ready for release (load up the web assembly module and compile it, then we
 * have it available for use)
 * 
 * realse web assembly, the source map, and the release text version human readable version of the weba assembly
 * 
 * the release.wasm gives us machine readable binary code 
 * the release.wasm gives us the line where something goes wrona nd gives us the line whree something went wrong
 * 
 * release.wat does a lot of operations and it takes our index.TS and recodes it in machine code (machine instructions)
 * 
 * WEB PROJECT:
 * 
 * run the web project in npm (npm install then start)
 * 
 * INDEX.HTML:
 * 
 * index has a button div combo (one for TS, one for web assembly, and one with TS on a web worker)
 * 
 * MAIN.TS:
 * 
 * imports web assembly module then the findnthprime has the TS version of finding the nth prime number
 * 
 * we have a query selector for the buttons
 * 
 * we call the run trial button so the trials are almost identical and we run one on TS and one on web assembly 
 * 
 * take the timestamp then start and end the time in between then 
 * 
 * we click run with TS then our interface locks up and we can't even hover and we get a warning saying our page is unresponsive
 * then we get a warning saying to close the program because it's taking too long (takes 24 seconds to find the 2 millionth prime)
 * 
 * when we click web assembly we still wait and get the wait warning and web assembly is slowe rby about 6 seconds compared to TS 
 * 
 * for TS with web worker is does the work in the background and it's still running and we can still hover and we have work on a separate
 * thread so we don't get the wait error on our browser and it returns it faster than the TS and the web assembly only 
 * 
 * WORKER.TS:
 * 
 * a web worker is another script file we call and we import findnthprime and it recieves work by an onmessage handler 
 * and it recieves a message from somewhere and we take the nth prime and find data[0] on the request and when 
 * we are done we send a opst message saying we are done
 * 
 * on the bottom of main.TS we say worker post message and we get the post message at the 2 millionth prime
 * 
 * worker on message is when we recieve the message is back from the worker and sent the event data 
 * 
 * we give it work and recieve the data back from main.TS
 * 
 * do impoat with ?worker and it gives us constructor for web worker (other code bases has const myworker = import('./worker/ts))
 * we can't do that in TS in main.TS because**
 * 
 * EXAMPLES:
 * 
 * there are a lot of examples of web assembly like figma and they compile it to web assembly to run it in the browser
 * (allows smooth performance in the browser)
 * 
 * google maps and diablo web allows things to run in the browser
 * 
 * unity also uses WebGL to publish our games into web assembly wihtin the browser
 * 
 * rTexPacker is a way to make sprite sheets and atlas texture for 2D games within the browser (exported in web assembly) 
 * 
 */
