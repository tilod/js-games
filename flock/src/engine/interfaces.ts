import BrowserWindow from './browser-window';
import Sprite from './view/sprite';
import Peg from './physics/peg';
import World from './world';

export interface Item {
  id: String;
  world: World;
  peg: Peg;
  sprite: Sprite;

  plan(step: number): void;
  move(step: number, boardRatio: number): void;
  render(browserWindow: BrowserWindow): void;
}
