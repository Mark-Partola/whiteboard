import { IComponent } from "../types/domain";
import { Camera } from "../camera/Camera";
import { BackgroundTiles } from "../background-tiles";
import { IPattern } from "./types";

export class BackgroundPattern implements IComponent {
  private camera: Camera;
  private pattern: IPattern;
  private backgroundTiles: BackgroundTiles;

  public constructor(params: { camera: Camera; pattern: IPattern }) {
    this.camera = params.camera;
    this.pattern = params.pattern;

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
    const pattern = this.pattern.getImage();
    const tiles = this.backgroundTiles.getTiles();
    const cameraPosition = this.camera.getPosition();
    const cameraZoom = this.camera.getZoom();

    tiles.forEach((position) => {
      ctx.drawImage(
        pattern,
        (position.x - cameraPosition.x) * cameraZoom,
        (position.y - cameraPosition.y) * cameraZoom,
        dimensions.width * cameraZoom,
        dimensions.height * cameraZoom
      );
    });
  }
}
