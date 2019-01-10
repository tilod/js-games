import World from "../world";
import Point2D from "../geometry/point2d";
import { Item } from "../interfaces";

export default class FlockAI {
  private _world: World;
  private _item: Item;
  private _tag: String;

  private _quadCohesionDistance: number;
  private _cohesionWeight: number;
  private _quadAlignmentDistance: number;
  private _alignmentWeight: number;
  private _quadSeparationDistance: number;
  private _separationWeight: number;

  constructor(
    world: World,
    item: Item,
    tag: String,
    {
      cohesionDistance = 0.2,
      cohesionWeight = 1,
      alignmentDistance = 0.1,
      alignmentWeight = 2,
      separationDistance = 0.01,
      separationWeight = 4,
    }: {
      cohesionDistance?: number,
      cohesionWeight?: number,
      alignmentDistance?: number,
      alignmentWeight?: number,
      separationDistance?: number,
      separationWeight?: number,
    } = {},
  ) {
    this._world = world;
    this._item = item;
    this._tag = tag;

    this._quadCohesionDistance = cohesionDistance * cohesionDistance;
    this._cohesionWeight = cohesionWeight;
    this._quadAlignmentDistance = alignmentDistance * alignmentDistance;
    this._alignmentWeight = alignmentWeight,
    this._quadSeparationDistance = separationDistance * separationDistance;
    this._separationWeight = separationWeight;
  }

  direction(): Point2D {
    const position = this._item.peg.position;
    const heading = this._item.peg.heading;

    let cohesionNeighborCount: number = 1;
    let cohesionPosition: Point2D = position;

    let alignmentNeighborCount: number = 1;
    let alignmentHeading: Point2D = heading;

    let separationNeighborCount: number = 0;
    let separationPosition: Point2D = new Point2D(0, 0);

    for (const item of this._world.getItems(this._tag)) {
      if (item === this._item) continue;
      const quadDistance = position.quadDistance(item.peg.position)

      if (quadDistance > this._quadCohesionDistance) continue;
      ++cohesionNeighborCount;
      cohesionPosition = cohesionPosition.add(item.peg.position);

      if (quadDistance > this._quadAlignmentDistance) continue;
      ++alignmentNeighborCount;
      alignmentHeading = alignmentHeading.add(item.peg.heading);

      if (quadDistance > this._quadSeparationDistance) continue;
      ++separationNeighborCount;
      separationPosition =
        separationPosition.add(
          item.peg.position.substract(position)
        );
    }

    const cohesionDirection: Point2D =
      cohesionNeighborCount > 1
        ? cohesionPosition
            .divide(cohesionNeighborCount)
            .substract(position)
            .normalize(this._cohesionWeight)
        : heading.normalize(1);
    const alignmentDirection: Point2D =
      alignmentNeighborCount > 2
        ? alignmentHeading
            .divide(alignmentNeighborCount)
            .normalize(this._alignmentWeight)
        : heading.normalize(1);
    const separationDirection: Point2D =
      separationNeighborCount > 0
        ? separationPosition
            .divide(separationNeighborCount)
            .negate()
            .normalize(this._separationWeight)
        : heading.normalize(1);

    return cohesionDirection
      .add(alignmentDirection)
      .add(separationDirection);
  }
}
