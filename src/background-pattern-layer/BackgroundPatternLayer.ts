import { Canvas } from "../renderer/Canvas";
import { IComponent, IDimensions } from "../types/domain";

export class BackgroundPatternLayer implements IComponent {
  private canvas: Canvas;
  private squareSize = 10;
  private squaresCountX: number = 0;
  private squaresCountY: number = 0;
  private dimensions: IDimensions = {
    width: 100,
    height: 100,
  };

  public constructor() {
    this.canvas = new Canvas({ dimensions: this.dimensions });
    this.defineSquaresCount(this.dimensions);
    this.render();
  }

  public render() {
    this.canvas.clear();

    for (let i = 0; i < this.squaresCountX; i++) {
      for (let j = 0; j < this.squaresCountY; j++) {
        const xOffset = this.squareSize * i;
        const yOffset = this.squareSize * j;
        const xOffsetWithSide = xOffset + this.squareSize;
        const yOffsetWithSide = yOffset + this.squareSize;

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

  public getDimensions() {
    return this.dimensions;
  }

  private defineSquaresCount(dimensions: IDimensions) {
    this.squaresCountX = Math.ceil(dimensions.width / this.squareSize);
    this.squaresCountY = Math.ceil(dimensions.height / this.squareSize);
  }
}
