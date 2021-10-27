import { Canvas } from "../renderer/CreateCanvas";
import { IDimensions } from "../types/domain";

export class BackgroundPatternLayer {
  private dimensions: IDimensions;
  private canvas: Canvas;

  public constructor(params: { dimensions: IDimensions }) {
    this.dimensions = params.dimensions;
    this.canvas = new Canvas(params.dimensions);
  }

  public update(params: { dimensions: IDimensions }) {
    this.dimensions = params.dimensions;
    this.canvas.resize(params.dimensions);
  }

  public render() {
    this.canvas.clear();

    const squareSize = 10;

    const squaresCountX = Math.floor(this.dimensions.width / squareSize);
    const squaresCountY = Math.floor(this.dimensions.height / squareSize);

    for (let i = 0; i < squaresCountX; i++) {
      for (let j = 0; j < squaresCountY; j++) {
        const xOffset = squareSize * i;
        const yOffset = squareSize * j;
        const xOffsetWithSide = xOffset + squareSize;
        const yOffsetWithSide = yOffset + squareSize;

        this.canvas.ctx.moveTo(xOffset, yOffset);
        this.canvas.ctx.lineTo(xOffsetWithSide, yOffset);
        this.canvas.ctx.lineTo(xOffsetWithSide, yOffsetWithSide);
      }
    }

    this.canvas.ctx.save();
    this.canvas.ctx.globalAlpha = 0.07;
    this.canvas.ctx.stroke();
    this.canvas.ctx.restore();
  }

  public getCanvas() {
    return this.canvas.getCanvas();
  }
}
