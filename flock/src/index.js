import Board from './board.js';
import BrowserWindow from './browser-window.js';
import Pointer from './pointer.js';
import Scene from './scene.js';

const browserWindow = BrowserWindow();
const scene = Scene();
scene.spawn('board', Board);
scene.spawn('pointer', Pointer);

const loop = (timestamp) => {
  scene.update(timestamp - lastRender, browserWindow.normalizedHeight());
  scene.draw(browserWindow.scale());

  lastRender = timestamp;
  window.requestAnimationFrame(loop);
};

let lastRender = 0;
window.requestAnimationFrame(loop);
