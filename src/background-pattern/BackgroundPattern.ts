import { IComponent } from "../types/domain";
import { Camera } from "../camera/Camera";
import { BackgroundTiles } from "../background-tiles";
import { MeshPattern } from "./mesh-pattern";

export class BackgroundPattern implements IComponent {
  private camera: Camera;
  private pattern: MeshPattern;
  private backgroundTiles: BackgroundTiles;

  public constructor(params: { camera: Camera }) {
    this.camera = params.camera;
    this.pattern = new MeshPattern();
    this.backgroundTiles = new BackgroundTiles({
      dimensions: this.pattern.getDimensions(),
      camera: this.camera,
    });
  }

  public update() {
    this.backgroundTiles.update();
  }

  public render(ctx: CanvasRenderingContext2D) {
    const dimensions = this.pattern.getDimensions();
    const pattern = this.pattern.getCanvas();
    const tiles = this.backgroundTiles.getTiles();

    tiles.forEach((position) => {
      ctx.drawImage(
        pattern,
        position.x - this.camera.position.x,
        position.y - this.camera.position.y,
        dimensions.width,
        dimensions.height
      );
    });
  }
}
