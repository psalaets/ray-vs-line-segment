var lineIntersect = require('line-intersect');
var Vec2 = require('vec2');

/**
* Finds where a ray hits a line segment, if at all.
*
* @param {object} rayish
* @param {object} segment
* @return {object} point (x/y) where ray hits segment or null if it doesn't hit
*/
function rayVsLineSegment(rayish, segment) {
  var result = lineIntersect.checkIntersection(
    rayish.start.x, rayish.start.y, rayish.end.x, rayish.end.y,
    segment.start.x, segment.start.y, segment.end.x, segment.end.y
  );

  // definitely no intersection
  if (result.type == 'none' || result.type == 'parallel') return null;

  // single intersection point
  if (result.type == 'intersecting') return result.point;

  // colinear, so now check if ray/segment overlap
  if (segmentContainsPoint(segment, rayish.start)) {
    return rayish.start;
  } else {
    // return segment endpoint that is
    //   - within ray
    //   - closest to ray start
    var rayStart = new Vec2(rayish.start);
    var endpointsInRay = segmentEndpointsInRay(rayish, segment);
    return rayStart.nearest(endpointsInRay);
  }
}

function segmentContainsPoint(segment, point) {
  return lineIntersect.colinearPointWithinSegment(
    point.x, point.y,
    segment.start.x, segment.start.y,
    segment.end.x, segment.end.y
  );
}

function segmentEndpointsInRay(rayish, segment) {
  return [segment.start, segment.end].map(function(p) {
    return new Vec2(p);
  }).filter(function(vec) {
    return segmentContainsPoint(rayish, vec);
  });
}

module.exports = rayVsLineSegment;
