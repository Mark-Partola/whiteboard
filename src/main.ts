import { Canvas } from "./renderer/CreateCanvas";
import { Loop } from "./renderer/Loop";

import "./style.css";

const config = {
  width: window.innerWidth,
  height: window.innerHeight,
};

const patternLayerCanvas = new Canvas({
  width: config.width,
  height: config.height,
});

const canvas = new Canvas({
  root: document.body,
  width: config.width,
  height: config.height,
});

function renderPattern() {
  patternLayerCanvas.clear();

  const squareSize = 10;

  const squaresCountX = Math.floor(config.width / squareSize);
  const squaresCountY = Math.floor(config.height / squareSize);

  for (let i = 0; i < squaresCountX; i++) {
    for (let j = 0; j < squaresCountY; j++) {
      const xOffset = squareSize * i;
      const yOffset = squareSize * j;
      const xOffsetWithSide = xOffset + squareSize;
      const yOffsetWithSide = yOffset + squareSize;

      patternLayerCanvas.ctx.moveTo(xOffset, yOffset);
      patternLayerCanvas.ctx.lineTo(xOffsetWithSide, yOffset);
      patternLayerCanvas.ctx.lineTo(xOffsetWithSide, yOffsetWithSide);
    }
  }

  patternLayerCanvas.ctx.save();
  patternLayerCanvas.ctx.globalAlpha = 0.1;
  patternLayerCanvas.ctx.stroke();
  patternLayerCanvas.ctx.restore();
}

renderPattern();
window.addEventListener("resize", () => {
  config.width = window.innerWidth;
  config.height = window.innerHeight;

  const nextSize = {
    width: config.width,
    height: config.height,
  };

  patternLayerCanvas.resize(nextSize);
  canvas.resize(nextSize);

  renderPattern();
});

new Loop({
  render: () => {
    canvas.clear();
    canvas.ctx.drawImage(
      patternLayerCanvas.canvas,
      0,
      0,
      config.width,
      config.height
    );
  },
}).run();
