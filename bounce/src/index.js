import World from './world';
import Ball from './world/ball';
import Board from './world/board';

const world = new World();
world.spawn('board', Board);
world.spawn('ball', Ball);

const loop = (timestamp) => {
  world.update(timestamp - lastRender);

  lastRender = timestamp;
  window.requestAnimationFrame(loop);
};

let lastRender = 0;
window.requestAnimationFrame(loop);
