import { IPoint } from "./types/domain";
import { Camera } from "./camera/Camera";
import { Loop } from "./renderer/Loop";
import { DragAndDrop } from "./interaction/DragAndDrop";
import { AppLayer } from "./app-layer";

import "./style.css";

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

const tiles: IPoint[] = [
  {
    x: 0,
    y: 0,
  },
];

const canvas = new AppLayer({
  camera,
});

const loop = new Loop({
  init: () => {
    canvas.init();

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
    canvas.render(tiles);
  },
});

loop.run();
