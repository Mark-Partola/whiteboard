# Change background

To set background you can use pre-rendered canvas as it was done in `BackgroundPatternLayer` or you can use HTML image.
Background renders using `BackgroundTiles` and the only thing you need to do is to set proper width and height.

Using pre-rendered layer

```TS
const dimensions = backgroundPatternLayer.getDimensions();

const backgroundTiles = new BackgroundTiles({
 dimensions,
 camera,
});
```

Using image

```TS
const img = new Image();
img.src = "path/to/image";

// somewhere after loading image

const backgroundTiles = new BackgroundTiles({
 dimensions: {
     width: img.width,
     height: img.height
 },
 camera,
});
```
