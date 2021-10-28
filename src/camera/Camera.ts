import { IDimensions, IOffset, IPoint } from "../types/domain";

export interface ICameraParams {
  dimensions: IDimensions;
  position: IPoint;
}

export class Camera {
  public constructor(private readonly params: ICameraParams) {}

  public moveTo(point: IPoint) {
    this.params.position = point;
  }

  public moveBy(offset: IOffset) {
    this.params.position.x -= offset.dx;
    this.params.position.y -= offset.dy;
  }

  public set dimensions(dimensions: IDimensions) {
    this.params.dimensions = dimensions;
  }

  public get dimensions() {
    return this.params.dimensions;
  }

  public get position() {
    return this.params.position;
  }
}
