import { boundClass } from "autobind-decorator";
import { IOffset, IPoint } from "./types/domain";
import { BackgroundPatternLayer } from "./background-pattern-layer";
import { Canvas } from "./renderer/CreateCanvas";
import { Camera } from "./camera/Camera";
import { Loop } from "./renderer/Loop";

import "./style.css";

@boundClass
class DragAndDrop {
  private startX: number = 0;
  private startY: number = 0;

  public constructor(
    private readonly params: {
      onMove: (delta: IOffset) => void;
    }
  ) {
    document.addEventListener("mousedown", this.handleMouseDown);
  }

  private handleMouseDown(event: MouseEvent) {
    this.startX = event.pageX;
    this.startY = event.pageY;

    document.addEventListener("mousemove", this.handleMouseMove);
    document.addEventListener("mouseup", this.handleMouseUp);
  }

  private handleMouseMove(event: MouseEvent) {
    const { pageX, pageY } = event;
    const dx = pageX - this.startX;
    const dy = pageY - this.startY;

    this.startX = pageX;
    this.startY = pageY;

    this.params.onMove({ dx, dy });
  }

  private handleMouseUp() {
    document.removeEventListener("mousemove", this.handleMouseMove);
    document.removeEventListener("mouseup", this.handleMouseUp);
  }
}

const camera = new Camera({
  dimensions: {
    width: window.innerWidth,
    height: window.innerHeight,
  },
  position: {
    x: 0,
    y: 0,
  },
});

const backgroundPatternLayer = new BackgroundPatternLayer({
  dimensions: camera.dimensions,
});

const canvas = new Canvas({
  root: document.body,
  ...camera.dimensions,
});

const tiles: IPoint[] = [
  {
    x: 0,
    y: 0,
  },
];

const loop = new Loop({
  init: () => {
    backgroundPatternLayer.render();

    window.addEventListener("resize", () => {
      const dimensions = (camera.dimensions = {
        width: window.innerWidth,
        height: window.innerHeight,
      });

      backgroundPatternLayer.update({ dimensions });
      canvas.resize(dimensions);

      backgroundPatternLayer.render();
    });

    new DragAndDrop({
      onMove: (offset) => camera.moveBy(offset),
    });
  },
  update: () => {
    const calcTilesIndex = (params: {
      cameraOffset: number;
      tileSize: number;
    }) => {
      const absIntersection = Math.abs(params.cameraOffset) / params.tileSize;
      const absIndex = Math.ceil(absIntersection);

      const sign = Math.sign(params.cameraOffset);

      if (absIndex === 0) {
        return absIndex;
      }

      return sign > 0 ? absIndex - 1 : -absIndex;
    };

    const tileWidth = camera.dimensions.width;
    const tileHeight = camera.dimensions.height;

    const leftMostTileIndex = calcTilesIndex({
      cameraOffset: camera.position.x,
      tileSize: tileWidth,
    });

    const rightMostTileIndex = calcTilesIndex({
      cameraOffset: camera.position.x + camera.dimensions.width,
      tileSize: tileWidth,
    });

    const topMostTileIndex = calcTilesIndex({
      cameraOffset: camera.position.y,
      tileSize: tileHeight,
    });

    const bottomMostTileIndex = calcTilesIndex({
      cameraOffset: camera.position.y + camera.dimensions.height,
      tileSize: tileHeight,
    });

    const nextTiles: IPoint[] = [];
    for (let x = leftMostTileIndex; x <= rightMostTileIndex; x++) {
      for (let y = topMostTileIndex; y <= bottomMostTileIndex; y++) {
        nextTiles.push({ x: x * tileWidth, y: y * tileHeight });
      }
    }

    console.log(nextTiles);

    nextTiles.forEach((nextTile) => {
      const isTileExist = tiles.find(
        (tile) => tile.x === nextTile.x && tile.y === nextTile.y
      );

      if (!isTileExist) {
        tiles.push(nextTile);
      }
    });
  },
  render: () => {
    canvas.clear();

    tiles.forEach((position) => {
      canvas.ctx.drawImage(
        backgroundPatternLayer.getCanvas(),
        position.x - camera.position.x,
        position.y - camera.position.y,
        camera.dimensions.width,
        camera.dimensions.height
      );
    });
  },
});

loop.run();
