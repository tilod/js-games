import BrowserWindow from './browser-window';

export interface Item {
  update(step: number, boardRatio: number): void;
  render(browserWindow: BrowserWindow): void;
}
