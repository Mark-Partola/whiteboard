import { Camera } from "./camera/Camera";
import { Loop } from "./renderer/Loop";
import { AppLayer } from "./app-layer";
import { BackgroundTiles } from "./background-tiles";
import { BackgroundPatternLayer } from "./background-pattern-layer";

import "./style.css";

const config = {
  container: {
    dimensions: {
      width: window.innerWidth,
      height: window.innerHeight,
    },
  },
};

const camera = new Camera({
  dimensions: config.container.dimensions,
  position: {
    x: 0,
    y: 0,
  },
});

const backgroundPatternLayer = new BackgroundPatternLayer({
  dimensions: camera.dimensions,
});

const app = new AppLayer({
  camera,
  pattern: backgroundPatternLayer.getCanvas(),
});

const backgroundTiles = new BackgroundTiles({
  dimensions: config.container.dimensions,
  camera,
});

const loop = new Loop({
  init: () => {
    backgroundPatternLayer.render();

    window.addEventListener("resize", () => {
      const dimensions = (config.container.dimensions = {
        width: window.innerWidth,
        height: window.innerHeight,
      });

      camera.dimensions = dimensions;

      app.resize(dimensions);

      backgroundPatternLayer.update({ dimensions });
      backgroundPatternLayer.render();
    });
  },
  update: () => {
    backgroundTiles.update();
    app.update({ tiles: backgroundTiles.getTiles() });
  },
  render: () => {
    app.render();
  },
});

loop.run();
