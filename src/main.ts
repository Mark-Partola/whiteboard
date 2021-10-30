import { Camera } from "./camera/Camera";
import { Loop } from "./renderer/Loop";
import { AppLayer } from "./app-layer";
import { BackgroundPattern } from "./background-pattern";

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

const backgroundPattern = new BackgroundPattern({
  camera,
});

const app = new AppLayer({
  components: [backgroundPattern],
});

const loop = new Loop({
  init: () => {
    window.addEventListener("resize", () => {
      const dimensions = (config.container.dimensions = {
        width: window.innerWidth,
        height: window.innerHeight,
      });

      camera.dimensions = dimensions;

      app.resize(dimensions);
    });
  },
  update: () => {
    app.update();
  },
  render: () => {
    app.render();
  },
});

loop.run();
