import BrowserWindow from './browser-window';
import World from './world';
import Sprite from './view/sprite';
import Peg from './physics/peg';

export interface Item {
  world: World;
  peg: Peg;
  sprite: Sprite;

  update(step: number, boardRatio: number): void;
  render(browserWindow: BrowserWindow): void;
}
