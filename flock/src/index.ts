import Engine from './engine';
import Bird from './flock/bird';
import Hunter from './flock/hunter';

const engine = new Engine();

engine
  .spawn(new Bird(0.75), ['bird'])
  .spawn(new Bird(-0.5), ['bird'])
  .spawn(new Bird(0.25), ['bird'])
  .spawn(new Hunter())
  .start();
