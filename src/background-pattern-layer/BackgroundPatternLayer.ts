import { Canvas } from "../renderer/Canvas";
import { IComponent, IDimensions } from "../types/domain";

export interface IBackgroundPatternLayerUpdateParams {
  dimensions: IDimensions;
}

export class BackgroundPatternLayer
  implements IComponent<IBackgroundPatternLayerUpdateParams>
{
  private canvas: Canvas;
  private squareSize = 10;
  private squaresCountX: number = 0;
  private squaresCountY: number = 0;

  public constructor(params: { dimensions: Readonly<IDimensions> }) {
    this.canvas = new Canvas({ dimensions: params.dimensions });

    this.defineSquaresCount(params.dimensions);
  }

  public update(params: IBackgroundPatternLayerUpdateParams) {
    this.defineSquaresCount(params.dimensions);

    this.canvas.resize(params.dimensions);
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

  private defineSquaresCount(dimensions: IDimensions) {
    this.squaresCountX = Math.ceil(dimensions.width / this.squareSize);
    this.squaresCountY = Math.ceil(dimensions.height / this.squareSize);
  }
}
