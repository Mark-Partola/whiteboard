import { Camera } from "../camera/Camera";
import { IDimensions, IPoint } from "../types/domain";

export interface IBackgroundTilesParams {
  dimensions: Readonly<IDimensions>;
  camera: Camera;
}

export class BackgroundTiles {
  private tiles: IPoint[] = [
    {
      x: 0,
      y: 0,
    },
  ];

  public constructor(private readonly params: IBackgroundTilesParams) {}

  public update() {
    const { camera, dimensions } = this.params;

    const leftMostTileIndex = this.calcTilesIndex({
      cameraOffset: camera.position.x,
      tileSize: dimensions.width,
    });

    const rightMostTileIndex = this.calcTilesIndex({
      cameraOffset: camera.position.x + camera.dimensions.width,
      tileSize: dimensions.width,
    });

    const topMostTileIndex = this.calcTilesIndex({
      cameraOffset: camera.position.y,
      tileSize: dimensions.height,
    });

    const bottomMostTileIndex = this.calcTilesIndex({
      cameraOffset: camera.position.y + camera.dimensions.height,
      tileSize: dimensions.height,
    });

    const nextTiles: IPoint[] = [];
    for (let x = leftMostTileIndex; x <= rightMostTileIndex; x++) {
      for (let y = topMostTileIndex; y <= bottomMostTileIndex; y++) {
        nextTiles.push({
          x: x * this.params.dimensions.width,
          y: y * this.params.dimensions.height,
        });
      }
    }

    nextTiles.forEach((nextTile) => {
      const isTileExist = this.tiles.find(
        (tile) => tile.x === nextTile.x && tile.y === nextTile.y
      );

      if (!isTileExist) {
        this.tiles.push(nextTile);
      }
    });

    console.log(this.tiles);
  }

  public getTiles() {
    return this.tiles;
  }

  private calcTilesIndex(params: { cameraOffset: number; tileSize: number }) {
    const absIntersection = Math.abs(params.cameraOffset) / params.tileSize;
    const absIndex = Math.ceil(absIntersection);

    const sign = Math.sign(params.cameraOffset);

    if (absIndex === 0) {
      return absIndex;
    }

    return sign > 0 ? absIndex - 1 : -absIndex;
  }
}