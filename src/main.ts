import { BackgroundPatternLayer } from "./background-pattern-layer";
import { Canvas } from "./renderer/CreateCanvas";
import { Loop } from "./renderer/Loop";

import "./style.css";

const config = {
  dimensions: {
    width: window.innerWidth,
    height: window.innerHeight,
  },
};

const backgroundPatternLayer = new BackgroundPatternLayer({
  dimensions: config.dimensions,
});

const canvas = new Canvas({
  root: document.body,
  ...config.dimensions,
});

const loop = new Loop({
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
  },
  render: () => {
    canvas.clear();
    canvas.ctx.drawImage(
      backgroundPatternLayer.getCanvas(),
      0,
      0,
      config.dimensions.width,
      config.dimensions.height
    );
  },
});

loop.run();
