import World from './world';
import Ball from './world/ball';
import Board from './world/board';

const world = new World();
world.spawn('board', Board);
world.spawn('blue-ball', Ball, {
  size: 100,
  position: [100, 100],
  heading: [1, 1],
  view: { backgroundColor: 'darkblue' }
});
world.spawn('red-ball', Ball, {
  size: 100,
  position: [900, 100],
  heading: [-1, 2],
  view: { backgroundColor: 'red' }
});

const loop = (timestamp) => {
  world.update(timestamp - lastRender);

  lastRender = timestamp;
  window.requestAnimationFrame(loop);
};

let lastRender = 0;
window.requestAnimationFrame(loop);
