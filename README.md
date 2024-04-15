# w13-example-webassembly

This repo contains two project directories:

`./assembly` : Which is a WebAssembly / AssemblyScript project that does a quick demo of how that all works.

`./web` : Which is a Vite project that runs the code from `assembly` along with a plain JavaScript version (to compare the two).

As a reminder, that means you'll have to `cd` into each directory and run `npm install` to get them up and running.

## Running Yourself

Start in `./assembly` and run `npm install`. Then run `npm run asbuild` - which will compile `./assembly/assembly/index.ts` and put the output in the `./assembly/build` directory.

Now go to `./web` and run `npm install`. The `./web/src/main.ts` file is already set up to import items from `./assembly/build`. Run `npm start` and visit `localhost:5173` in the browser to compare JavaScript and WebAssembly (and JavaScript on a Web Worker).
