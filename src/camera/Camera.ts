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
      onChange: (params) => {
        const zoomDelta = params.delta.dy * -0.01;
        this.zoom -= zoomDelta;
        this.zoom = Math.min(Math.max(0.125, this.zoom), 4);
      },
    });
  }

  public moveBy(offset: Readonly<IOffset>): void {
    this.position = {
      x: this.position.x - offset.dx / this.zoom,
      y: this.position.y - offset.dy / this.zoom,
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
    const positionDeltaX =
      (this.dimensions.width - this.dimensions.width / this.zoom) / 2;
    const positionDeltaY =
      (this.dimensions.height - this.dimensions.height / this.zoom) / 2;

    return {
      x: this.position.x + positionDeltaX,
      y: this.position.y + positionDeltaY,
    };
  }

  public getZoom(): number {
    return this.zoom;
  }

  public setZoom(zoom: number): void {
    this.zoom = zoom;
  }
}
