import Engine from './engine';
import Bird from './flock/bird';
import DistanceMap from './engine/physics/distance_map';
import Hunter from './flock/hunter';

const engine: Engine = new Engine();

const birdsDistanceMap = new DistanceMap();

engine
  .spawn(new Bird('bird1'), ['bird'])
  .spawn(new Bird('bird2'), ['bird'])
  .spawn(new Bird('bird3'), ['bird'])
  .spawn(new Bird('bird4'), ['bird'])
  .spawn(new Bird('bird5'), ['bird'])
  .spawn(new Bird('bird6'), ['bird'])
  .spawn(new Bird('bird7'), ['bird'])
  .spawn(new Bird('bird8'), ['bird'])
  .spawn(new Bird('bird9'), ['bird'])
  .spawn(new Bird('bird10'), ['bird'])
  .spawn(new Bird('bird11'), ['bird'])
  .spawn(new Bird('bird12'), ['bird'])
  .spawn(new Bird('bird13'), ['bird'])
  .spawn(new Bird('bird14'), ['bird'])
  .spawn(new Bird('bird15'), ['bird'])
  .spawn(new Bird('bird16'), ['bird'])
  .spawn(new Bird('bird17'), ['bird'])
  .spawn(new Bird('bird18'), ['bird'])
  .spawn(new Bird('bird19'), ['bird'])
  .spawn(new Bird('bird20'), ['bird'])
  .spawn(new Bird('bird21'), ['bird'])
  .spawn(new Bird('bird22'), ['bird'])
  .spawn(new Bird('bird23'), ['bird'])
  .spawn(new Bird('bird24'), ['bird'])
  .spawn(new Bird('bird25'), ['bird'])
  .spawn(new Bird('bird26'), ['bird'])
  .spawn(new Bird('bird27'), ['bird'])
  .spawn(new Bird('bird28'), ['bird'])
  .spawn(new Bird('bird29'), ['bird'])
  .spawn(new Bird('bird30'), ['bird'])
  .spawn(new Bird('bird31'), ['bird'])
  .spawn(new Bird('bird32'), ['bird'])
  .spawn(new Bird('bird33'), ['bird'])
  .spawn(new Bird('bird34'), ['bird'])
  .spawn(new Bird('bird35'), ['bird'])
  .spawn(new Bird('bird36'), ['bird'])
  .spawn(new Bird('bird37'), ['bird'])
  .spawn(new Bird('bird38'), ['bird'])
  .spawn(new Bird('bird39'), ['bird'])
  .spawn(new Bird('bird40'), ['bird'])
  .spawn(new Hunter('hunter'))
  .start();
