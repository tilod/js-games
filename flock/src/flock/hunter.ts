import { Item } from '../engine/interfaces';

import BrowserWindow from '../engine/browser-window';
import Point2D from '../engine/geometry/point2d';
import Peg from '../engine/physics/peg';
import Sprite from '../engine/view/sprite';
import World from '../engine/world';
import TurnToThreeNearestAI from '../engine/ai/turn_to_three_nearest_ai';

export default class Hunter implements Item {
  public peg: Peg;
  public sprite: Sprite;

  private _world: World;
  private _followAI: TurnToThreeNearestAI;
  private _turnTo: Point2D;

  constructor(world: World) {
    this._world = world;
    this._followAI = new TurnToThreeNearestAI(world, this, 'bird');

    this.peg =
      new Peg(
        new Point2D(Math.random(), Math.random()),
        new Point2D(Math.random() - 0.5, Math.random() - 0.5).normalize(0.0003),
      );

    this.sprite =
      new Sprite(document.documentElement, 'hunter', new Point2D(0.02, 0.02));
  }

  plan(): void {
    this._turnTo = this._followAI.direction();
  }

  move(step: number, boardRatio: number): void {
    this.peg
      .setupFrame(step, boardRatio)
      .turnWithMax(this._turnTo, 360)
      .executeMovement()
      .bounceOfWalls();
  }

  render(browserWindow: BrowserWindow): void {
    this.sprite.render(browserWindow, this.peg.position, this.peg.heading);
  }
}
