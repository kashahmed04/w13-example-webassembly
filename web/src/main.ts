import * as wasmModule from '../../assembly/build/release.wasm'; //by running npm run asbuild it builds the build directory for us
//but it's initially empty and we get this module when we call build for web assembly (build folder is made 
//when we call npm run asbuild)
import { findNthPrime } from './findNthPrime'; 

const runTSbutton = document.querySelector('#run-ts') as HTMLButtonElement;
const tsOut = document.querySelector('#ts-out') as HTMLDivElement;

const runWAbutton = document.querySelector('#run-wa') as HTMLButtonElement;
const waOut = document.querySelector('#wa-out') as HTMLDivElement;

runTSbutton.addEventListener('click', () => {
  runTrial(findNthPrime, tsOut);
});

runWAbutton.addEventListener('click', () => {
  //because we export our findnthprime in index.ts when we build our asbuild 
  //then eveyrthing we export will be part of the wasmModule and we can just call whatever we exported
  //with wasm.Module (this allows us to use this method with web assembly)
  runTrial(wasmModule.findNthPrime, waOut);
});

//performance.now() just gives us the current time stamp when we call it so we subtract the end from start
//to figure out how long it took to find the 2 millionth prime
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
// we have this for other languages that use web assembly: const myworker = import('./worker/ts) but
// TS can't use it because it does not run it in the browser directly so it had to be compiled and 
// for vite it repackages everything so we can't use a dynamic input for it 
// if we used the const it did not work because vite built and bundled everything
// this is the worker.ts file (we are going to run the code in this worker.ts file in a separate thread because we imported
// the worker.ts as a worker ?worker says it's a worker then the ./worker is the file)**
// outside of our main.ts and main thread in the browser and this all happens in the background below**
import MyWorker from './worker?worker';

const runWWbutton = document.querySelector('#run-ww') as HTMLButtonElement;
const wwOut = document.querySelector('#ww-out') as HTMLDivElement;

//has to be the same name as the name we used the import with when we make a new object
const worker = new MyWorker();

runWWbutton.addEventListener('click', () => {
  // we send a worker work with a postMessage
  // post message is a way to communicate between 2 separate contexts 
  // post message sends a message to somehwere else (psost a message to send it to the worker
  // then the worker waits)
  // main posts the message and worker hears it with on message then it sends a message back to main after
  // main
  // this sends a message to worker then worker listens and gets the message and does what it needs to then
  // sends the data back then worker.onmessage happens and thats where we get the data back
  // then we listen to the post message and post the data 
  worker.postMessage([2000000]);
});

//onmessage needs the event to listen back from the sender if we want to communicate in both directions but we don't need
//it if we want to work in one single direction (send stuff and say do this and don't send anything back)
//event.data is the string from worker 
worker.onmessage = (evt) => {
  wwOut.innerText = evt.data;
};


/**
 * NEW NOTES:
 * 
 * so is the main idea of web assembly to convert other coding languages into working in a web browser by coverting that code
 * into binary so it works with web assembly because web assembly works with binary only (yes)
 * 
 * web assbelmy is a way to write C, C++, C#, rust, etc. to run (code) in web browsers (yes)
 * 
 * web assembly is not assemnly but its lifelike what's different with JS it's a just in time compiled and web assembly is
 * binary format and sent to the browser automatically
 * JS is interpreted that means we feed to program to the browser and the browser figures out what happens based on what we put
 * (interpreted)
 * TS compiles
 * and web assembly runs directly with rules we set in binary (compiles to JS then JS is interpreted by the browser)
 * 
 * assembly means that code that runs at the processor level of a computer web assembly is similar but it has to run
 * within the browser context not the processor level of a computer (lower level language rather than higher level language
 * because it gives machine level instructions instead of object oriented machine instructions)
 * 
 * web assembly is a low level assembly like language because it's in binary format** (slide 2)**
 * 
 * how does it become binary code for web assembly if we don't write it in binary code how does it convert to binary code** (slide 2)**
 * 
 * it's a near native performanace we can run on the web which means** (slide 2)**
 * what is a compilaton target** (slide 2)**
 * 
 * web assembly can run with web assembley and JS can call web assembly things and web assembly things can call JS things** 
 * slide 2 last bullet** (how)**
 * 
 * the web assembly module loads in as a module then we have access to memeory, table (lookup of memeory), and lookup of module
 * (or web assembly)** (for all methods on slide 3 when we convert to web assembly or)** (slide 3)**
 * 
 * if we write in c or c++ we use emscipten to convert to web assembly or we 
 * could write it ourself in binary (machine level)** (slide 3)**
 * 
 * we can write a rust applicaiton and can set web assembly as the target** (slide 3)**
 * 
 * and unity uses web assembly for WebGL** (what does it mean by targetting something as it's output)** (slide 3)**
 * 
 * assembly script is like TS but converts to binary from TS and this one was chosen because it runs vite and npm start (it works
 * locally as well)**(slide 3)** (does it only convert TS to binary or does it also do binary to TS)** (when would we want to 
 * do binary to TS)** (slide 3)**
 * 
 * implement a function that lets us find the nth prime (example finds 2 millionth prime and finds out how long it takes
 * to find it for performance for the TS version, web assembly version, and web worker with TS version**
 * difference between TS and web worker with TS version of finding the nth prime**
 * difference between each method and finding the nth prime**
 * 
 * performance.now() gives us DOM high stamp res stamp and it's accurate to 5 micro seconds (very sepecific)**
 * we do this at start and do it at the end of our code then subtract end-start to find out how long the operation took**
 * 
 * we use performance API to measure how long it takes the get the
 * 2 millionth prime number for each type (just TS, just web assembly, and TS with
 * web worker)**
 * 
 * the browser feezes when we click the button for just TS and just web assebmly and we get a notificaiton on the browser to ask to
 * keep waiting or stop the program but eventually we get the time and 2 millionth
 * number** and instead we can use web workers to put that work onto another thread and geta message when it's done to
 * solve the problem** (slide 5)**
 * 
 * so web worker's main purpose is to do things for the web on another thread so the main thread does not get
 * too full** (when does it get too full)** (how did we use the web worker to get a message back when the operation was
 * complete was it using worker.ts in the web folder)** (slide 6)**
 * 
 * asynchronously means multiple threads and multiple operations happening at the same time (but in different threads)** but
 * synchronoulsy means to wait until this operation is done then do the rest of the code and operations right (usually all operations
 * happening on the main thread right for synchronous)** (slide 6)**
 * 
 * so just TS and just web assembly are synchronous (stops eveyrthing until one operation is done then moves on)**
 * whereas with the TS with web workers were asynchronous and ran multiple things at one time but each task
 * is in a different thread** (slide 6)** (for asynchronous does it usually run task per thread)** (slide 6)**
 * does asynchronous always return a message when the work is complete but not synchronous**
 * so doing things asynchornously clears the browser and keeps it clear
 * (but we add multiple threads so is the main thread only for the browser then thats why its clear because we 
 * create other threads instead for each operation in asynchronous whereas with synchrnous the browser is not clear because we do
 * everything on the main thread (the browser thread)** and stop until we complete that operation then move on)**
 * does the browser only have the one main thread**
 * 
 * README:
 * 
 * similar to work with web sockets and has 2 projects in the same project (assembly has assembly code and the other has
 * web directy which runs the web assembly code)** (we have to have 2 npm windows and start each project in 2 tabs to work in 1 tab)**
 * (could we use concurrently with this to run 2 commands or no on the same terminal npm tab)**
 * 
 * difference between assembly folder and web folder and what each does**
 * 
 * PACKGE.JSON:
 * 
 * gives us assembly script (do we make it or do we just get it automcaitcally with 
 * package.JSON)** and the asconfig tells us what we are about the build and where it goes** (where)**
 * 
 * INDEX.TS:
 * 
 * looks like TS but we compile it down into web assembly (how)**(find nth prime is the function that gets imported)(from where)**
 * 
 * we run a command in npm terminal tab** (what command)** 
 * which will build the assembly and that that file won't be empty anymore** (where)**
 * do we reference anything from the assembly that gets built in our code**
 * 
 * our build folder then gets the files when we run the command in npm and the debug is used for and the release is for**
 * 
 * release.d.TS tells us what the function looks like and** 
 * the release.JS compiles the module and gets it ready for release (load up the web assembly module and compiles it, then we
 * have it available for use)**
 * 
 * release web assembly, the source map, and the release text version human readable version of the web assembly**
 * 
 * the release.wasm gives us machine readable binary code** 
 * the release.wasm gives us the line where something goes wrong and gives us the line whree something went wrong**
 * 
 * release.wat does a lot of operations and it takes our index.TS and recodes it in machine code (machine instructions)**
 * 
 * WEB PROJECT:
 * 
 * run the web project in npm (npm install then start)
 * 
 * INDEX.HTML:
 * 
 * index has a button div combo (one for TS, one for web assembly, and one with TS on a web worker)**
 * 
 * MAIN.TS:
 * 
 * imports web assembly module then the findnthprime has the TS version of finding the nth prime number**
 * 
 * we have a query selector for the buttons
 * 
 * we call the run trial button so the trials are almost identical and we run one on TS and one on web assembly** (what is the difference
 * between the findnthprime and the index.ts and when do we use each)** 
 * 
 * we click run with TS then our interface locks up and we can't even hover and we get a warning saying our page is unresponsive
 * then we get a warning saying to close the program because it's taking too long (takes 24 seconds to find the 2 millionth prime)
 * 
 * when we click web assembly we still wait and get the wait warning and web assembly is slower by about 6 seconds compared to TS 
 * 
 * for TS with web worker is does the work in the background and it's still running and we can still hover and we have work on a separate
 * thread so we don't get the wait error on our browser and it returns the 2 millionth number
 * faster than the TS and the web assembly only** 
 * 
 * WORKER.TS:
 * 
 * a web worker is another script file we call and we import findnthprime and it recieves work by an onmessage handler 
 * and it recieves a message from somewhere and we take the nth prime and find data[0] on the request and when 
 * we are done we send a post message saying we are done**
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
 * rTexPacker is a way to make sprite sheets and atlas texture for 2D games within the browser (exported in web assembly)** 
 * 
 */
