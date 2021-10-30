import { DragAndDrop } from "../interaction/DragAndDrop";
import { Scroll } from "../interaction/Scroll";
import { IDimensions, IOffset, IPoint } from "../types/domain";

export interface ICameraParams {
  dimensions: Readonly<IDimensions>;
  position: Readonly<IPoint>;
}

export class Camera {
  public constructor(private readonly params: ICameraParams) {
    new DragAndDrop({
      onMove: (offset) => this.moveBy(offset),
    });

    new Scroll({
      onChange: console.log,
    });
  }

  public moveTo(point: Readonly<IPoint>) {
    this.params.position = point;
  }

  public moveBy(offset: Readonly<IOffset>) {
    this.params.position = {
      x: this.params.position.x - offset.dx,
      y: this.params.position.y - offset.dy,
    };
  }

  public setDimensions(dimensions: IDimensions) {
    this.params.dimensions = dimensions;
  }

  public getDimensions() {
    return this.params.dimensions;
  }

  public getPosition() {
    return this.params.position;
  }
}
