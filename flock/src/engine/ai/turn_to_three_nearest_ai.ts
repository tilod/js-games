import World from "../world";
import Point2D from "../geometry/point2d";
import { Item } from "../interfaces";

export default class TurnToThreeNearestAI {
  private _world: World;
  private _item: Item;
  private _tag: String;

  constructor(world: World, item: Item, tag: String) {
    this._world = world;
    this._item = item;
    this._tag = tag;
  }

  direction(): Point2D {
    const position: Point2D = this._item.peg.position;
    const items: Array<Item> = this._world.getItems(this._tag);

    let nearestDistance: number = 1;
    let nearestItem: Item = null;

    let secondNearestDistance: number = 1.1;
    let secondNearestItem: Item = null;

    let thirdNearestDistance: number = 1.2;
    let thirdNearestItem: Item = null;

    for (const item of items) {
      const distance: number = position.quadDistance(item.peg.position);
      if (distance < thirdNearestDistance) {
        if (distance < secondNearestDistance) {
          if (distance < nearestDistance) {
            thirdNearestDistance = secondNearestDistance;
            thirdNearestItem = secondNearestItem;
            secondNearestDistance = nearestDistance;
            nearestDistance = distance;
            secondNearestItem = nearestItem;
            nearestItem = item;
          } else {
            thirdNearestDistance = secondNearestDistance;
            thirdNearestItem = secondNearestItem;
            secondNearestDistance = distance;
            secondNearestItem = item;
          }
        } else {
          thirdNearestDistance = distance;
          thirdNearestItem = item;
        }
      }
    }

    return Point2D
      .center([
        nearestItem.peg.position,
        secondNearestItem.peg.position,
        thirdNearestItem.peg.position,
      ])
      .substract(position);
  }
}
