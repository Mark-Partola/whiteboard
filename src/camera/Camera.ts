import { DragAndDrop } from "../interaction/DragAndDrop";
import { Scroll } from "../interaction/Scroll";
import { IDimensions, IOffset, IPoint } from "../types/domain";

export interface ICameraParams {
  dimensions: Readonly<IDimensions>;
  position: Readonly<IPoint>;
}

export class Camera {
  private zoom: number = 1;
  private dimensions: IDimensions;
  private position: IPoint;

  public constructor(params: Readonly<ICameraParams>) {
    this.dimensions = params.dimensions;
    this.position = params.position;

    new DragAndDrop({
      onMove: (offset) => this.moveBy(offset),
    });

    new Scroll({
      onChange: (delta: IOffset) => {
        this.zoom += delta.dy * -0.01;
        this.zoom = Math.min(Math.max(0.125, this.zoom), 4);
      },
    });
  }

  public moveTo(point: Readonly<IPoint>): void {
    this.position = point;
  }

  public moveBy(offset: Readonly<IOffset>): void {
    this.position = {
      x: this.position.x - offset.dx,
      y: this.position.y - offset.dy,
    };
  }

  public setDimensions(dimensions: Readonly<IDimensions>): void {
    this.dimensions = dimensions;
  }

  public getDimensions(): IDimensions {
    return {
      width: this.dimensions.width / this.zoom,
      height: this.dimensions.height / this.zoom,
    };
  }

  public getPosition(): IPoint {
    return this.position;
  }

  public getZoom(): number {
    return this.zoom;
  }

  public setZoom(zoom: number): void {
    this.zoom = zoom;
  }
}
