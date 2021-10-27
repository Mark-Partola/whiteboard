import { boundClass } from "autobind-decorator";
import { IOffset, IPoint } from "./types/domain";
import { BackgroundPatternLayer } from "./background-pattern-layer";
import { Canvas } from "./renderer/CreateCanvas";
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

const config = {
  dimensions: {
    width: window.innerWidth,
    height: window.innerHeight,
  },
  offset: {
    dx: 0,
    dy: 0,
  },
};

const backgroundPatternLayer = new BackgroundPatternLayer({
  dimensions: config.dimensions,
});

const canvas = new Canvas({
  root: document.body,
  ...config.dimensions,
});

const tiles: IPoint[] = [
  {
    x: 0,
    y: 0,
  },
];

const loop = new Loop({
  frames: 60,
  init: () => {
    backgroundPatternLayer.render();

    window.addEventListener("resize", () => {
      const dimensions = (config.dimensions = {
        width: window.innerWidth,
        height: window.innerHeight,
      });

      backgroundPatternLayer.update({ dimensions });
      canvas.resize(dimensions);

      backgroundPatternLayer.render();
    });

    new DragAndDrop({
      onMove(offset) {
        config.offset.dx += offset.dx;
        config.offset.dy += offset.dy;
      },
    });
  },
  update: () => {
    const nextTile = {
      x: (config.offset.dx % config.dimensions.width) + config.dimensions.width,
      y: 0,
    };

    const isTileExist = tiles.find(
      (tile) => tile.x === nextTile.x && tile.y === nextTile.y
    );

    if (!isTileExist) {
      tiles.push(nextTile);
    }
  },
  render: () => {
    canvas.clear();

    tiles.forEach((position) => {
      // console.log(position);
      canvas.ctx.drawImage(
        backgroundPatternLayer.getCanvas(),
        position.x + config.offset.dx,
        position.y + config.offset.dy,
        config.dimensions.width + position.x,
        config.dimensions.height + position.y
      );
    });
  },
});

loop.run();
