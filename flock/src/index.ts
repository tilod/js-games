import Engine from './engine';
import Bird from './flock/bird';
import Hunter from './flock/hunter';

const engine: Engine = new Engine();

for (let i = 0; i < 100; ++i) engine.spawn(Bird, ['bird']);
engine.spawn(Hunter, ['hunter']);
engine.spawn(Hunter, ['hunter']);
engine.start();
