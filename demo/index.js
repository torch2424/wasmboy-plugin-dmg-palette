// Import the transformation lib
import WasmBoyPluginDMGPalette from '../dist/wasmboy-plugin-dmg-palette.esm';

// import the canvas interop
import { instantiateStreaming } from "canvas-as";

// create a context
const ctx = document.querySelector("canvas").getContext("2d");
const imports = {
  // put your imports here
};

// use an async function to load your module
async function main() {
  // just need to wait for the module to instantiate
  const interop = await instantiateStreaming<any>(fetch("./my/module.wasm"), imports);

  // initialize the canvas context inside wasm
  interop.useContext("main", ctx);

  // call the init function yourself to help wasm get the reference it needs
  interop.wasm.init();

  // setup a request animation frame loop
  requestAnimationFrame(function loop() {
    requestAnimationFrame(loop);

    // call tick()
    interop.tick();
  });
}

main();
