// You need to import your own allocator
import "allocator/tlsf";

// import CanvasRenderingContext2D and Image
import { Image, CanvasMap } from "./index";

let kitten: Image = new Image();
let rotation: f64 = 0;
let rotValue: f64 = Math.PI / 180.0;

export function init(): void {
  // You cannot load an image until the wasm module has been completely loaded
  kitten.src = "https://placekitten.com/300/300";
  // you can either get, or getOptimzed versions of the canvas context here
  ctx = CanvasMap.getOptimized("main");
}

export function tick(): void {
  // update the world
  rotation += rotValue;

  // perform some simple drawing calls
  ctx.clearRect(0.0, 0.0, 800.0, 600.0);
  ctx.save();
  ctx.translate(150.0, 150.0);
  ctx.rotate(rotation);
  ctx.translate(-150.0, -150.0);
  ctx.drawImagePosition(kitten, 0.0, 0.0);
  ctx.restore();

  // calling commit() actually draws the canvas
  ctx.commit();
}

export { memory }
