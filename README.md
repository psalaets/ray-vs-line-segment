# ray-vs-line-segment

Ray-aware line segment intersection check.

# Usage

```js
var rayVsLineSegment = require('ray-vs-line-segment');

var ray = {
  start: {x: 2, y: 0},
  end: {x: 7, y: 0},
};

var segment = {
  start: {x: 5, y: 0},
  end: {x: 10, y: 0},
};

var point = rayVsLineSegment(ray, segment);

point // {x: 5, y: 0}
```

# Install

```bash
npm install ray-vs-line-segment
```

# License

MIT