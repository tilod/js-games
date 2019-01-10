import World from "../world";
import { Item } from "../interfaces";
import Point2D from "../geometry/point2d";

export default class EscapeNearestAI {
  private _world: World;
  private _item: Item;
  private _tag: String;

  private _quadEscapeDistance: number;
  private _escapeWeight: number;

  constructor(
    world: World,
    item: Item,
    tag: String,
    {
      escapeDistance = 0.1,
      escapeWeight = 16,
    }: {
      escapeDistance?: number,
      escapeWeight?: number,
    } = {},
  ) {
    this._world = world;
    this._item = item;
    this._tag = tag;
    this._quadEscapeDistance = escapeDistance * escapeDistance;
    this._escapeWeight = escapeWeight;
  }

  direction(): [Point2D, boolean] {
    const position: Point2D = this._item.peg.position;
    const hunters: Array<Item> = this._world.getItems(this._tag);

    let nearestDistance: number = 1;
    let nearestHunter: Item = null;

    let escapeDirection: Point2D = null;
    let escapeMode: boolean = false;

    for (const hunter of hunters) {
      const distance: number = position.quadDistance(hunter.peg.position);
      if (distance < nearestDistance) {
        nearestDistance = distance;
        nearestHunter = hunter;
      }
    }

    if (nearestDistance < this._quadEscapeDistance) {
      escapeMode = true;
      escapeDirection =
        nearestHunter.peg.position
          .substract(position)
          .negate()
          .normalize(this._escapeWeight);
    } else {
      escapeDirection = this._item.peg.heading;
    }

    return [escapeDirection, escapeMode];
  }
}
