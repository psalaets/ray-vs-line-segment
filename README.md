# ray-vs-line-segment

Ray-aware line segment intersection check.

# Usage

    var rayVsLineSegment = require('ray-vs-line-segment');
    
    var Segment2 = require('segment2');
    var Vec2 = require('vec2');
    var Rayish = require('rayish');
    
    var segment = new Segment2(new Vec2(5, 0), new Vec2(10, 0));
    var ray = new Rayish(new Vec2(2, 0), new Vec2(7, 0));
    
    var point = rayVsLineSegment(ray, segment);
    
    point // (5, 0)

# Install

    npm install ray-vs-line-segment

# License

MIT
