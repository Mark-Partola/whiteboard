import { IDimensions } from "../types/domain";

export class Canvas {
  private width: number = 0;
  private height: number = 0;
  private canvas: HTMLCanvasElement;

  public ctx: CanvasRenderingContext2D;

  public constructor(params: {
    dimensions: Readonly<IDimensions>;
    root?: HTMLElement;
  }) {
    this.canvas = document.createElement("canvas");
    this.ctx = this.canvas.getContext("2d") as CanvasRenderingContext2D;

    this.resize({
      width: params.dimensions.width,
      height: params.dimensions.height,
    });

    if (params.root) {
      params.root.appendChild(this.canvas);
    }
  }

  public resize(params: { width: number; height: number }) {
    this.width = params.width;
    this.height = params.height;

    const dpr = window.devicePixelRatio;

    this.canvas.width = this.width * dpr;
    this.canvas.height = this.height * dpr;
    this.canvas.style.width = `${this.width}px`;
    this.canvas.style.height = `${this.height}px`;

    this.ctx.scale(dpr, dpr);
  }

  public clear() {
    this.ctx.clearRect(0, 0, this.width, this.height);
  }

  public getCanvas() {
    return this.canvas;
  }
}
