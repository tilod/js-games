import BrowserWindow from './browser-window';
import Sprite from './view/sprite';
import Peg from './physics/peg';

export interface Item {
  peg: Peg;
  sprite: Sprite;

  plan(): void;
  move(step: number, boardRatio: number): void;
  render(browserWindow: BrowserWindow): void;
}
