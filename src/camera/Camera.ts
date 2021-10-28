import { IDimensions, IOffset, IPoint } from "../types/domain";

export interface ICameraParams {
  dimensions: Readonly<IDimensions>;
  position: Readonly<IPoint>;
}

export class Camera {
  public constructor(private readonly params: ICameraParams) {}

  public moveTo(point: Readonly<IPoint>) {
    this.params.position = point;
  }

  public moveBy(offset: Readonly<IOffset>) {
    this.params.position = {
      x: this.params.position.x - offset.dx,
      y: this.params.position.y - offset.dy,
    };
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
