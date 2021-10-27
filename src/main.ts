import { Canvas } from "./renderer/CreateCanvas";

import "./style.css";

const canvas = new Canvas({ root: document.body });

const squareSize = 10;

const squaresCountX = Math.floor(window.innerWidth / squareSize);
const squaresCountY = Math.floor(window.innerHeight / squareSize);

for (let i = 0; i < squaresCountX; i++) {
  for (let j = 0; j < squaresCountY; j++) {
    const xOffset = squareSize * i;
    const yOffset = squareSize * j;
    const xOffsetWithSide = xOffset + squareSize;
    const yOffsetWithSide = yOffset + squareSize;

    canvas.ctx.moveTo(xOffset, yOffset);
    canvas.ctx.lineTo(xOffsetWithSide, yOffset);
    canvas.ctx.lineTo(xOffsetWithSide, yOffsetWithSide);
  }
}

canvas.ctx.save();
canvas.ctx.globalAlpha = 0.07;
canvas.ctx.stroke();
canvas.ctx.restore();
