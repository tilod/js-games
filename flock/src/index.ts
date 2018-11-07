import Engine from './engine';
import Bird from './flock/bird';

const engine = new Engine();

engine
  .spawn(new Bird())
  .start();
