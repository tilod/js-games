import Board from './world/board';
import Pointer from './pointer';
import Scene from './scene';

const scene = new Scene();
scene.spawn('board', Board);
scene.spawn('pointer', Pointer);

const loop = (timestamp) => {
  scene.update(timestamp - lastRender);

  lastRender = timestamp;
  window.requestAnimationFrame(loop);
};

let lastRender = 0;
window.requestAnimationFrame(loop);
