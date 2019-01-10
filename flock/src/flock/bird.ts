import { Item } from '../engine/interfaces';

import BrowserWindow from '../engine/browser-window';
import Point2D from '../engine/geometry/point2d';
import Peg from '../engine/physics/peg';
import Sprite from '../engine/view/sprite';
import World from '../engine/world';
import FlockAI from '../engine/ai/flock_ai';
import EscapeNearestAI from '../engine/ai/escape_ai';

export default class Bird implements Item {
  public peg: Peg;
  public sprite: Sprite;

  private _world: World;
  private _flockAI: FlockAI;
  private _escapeAI: EscapeNearestAI;
  private _turnTo: Point2D;
  private _escapeMode: boolean;

  constructor(world: World) {
    this._world = world;
    this._flockAI = new FlockAI(world, this, 'bird');
    this._escapeAI = new EscapeNearestAI(world, this, 'hunter');

    this.peg =
      new Peg(
        new Point2D(Math.random(), Math.random()),
        new Point2D(Math.random() - 0.5, Math.random() - 0.5).normalize(0.0002),
      );

    this.sprite =
      new Sprite(document.documentElement, 'bird', new Point2D(0.005, 0.005));
  }

  plan(): void {
    const [escapeDirection, escapeMode]: [Point2D, boolean] =
      this._escapeAI.direction();

    this._turnTo = this._flockAI.direction().add(escapeDirection);
    this._escapeMode = escapeMode;
  }

  move(step: number, boardRatio: number): void {
    const maxTurnRate: number = this._escapeMode ? 1020 : 360;

    this.peg
      .setupFrame(step, boardRatio)
      .turnWithMax(this._turnTo, maxTurnRate)
      .executeMovement()
      .bounceOfWalls();
  }

  render(browserWindow: BrowserWindow): void {
    this.sprite.render(browserWindow, this.peg.position, this.peg.heading);
  }
}
