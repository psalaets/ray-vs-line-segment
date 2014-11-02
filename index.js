var Segment2 = require('segment2');

/**
* Finds where a ray hits a line segment, if at all.
*
* @param {Rayish} rayish
* @param {Segment2} segment
* @return {Vec2} where ray hits segment or null if it doesn't hit
*/
function rayVsLineSegment(rayish, segment) {
  var result = segment.intersect(rayish);

  // no intersection
  if (!result) return null;

  // single intersection point
  if (result !== true) return result;

  // colinear, check if ray/segment overlap
  if (segment.containsPoint(rayish.start)) {
    return rayish.start;
  } else {
    // return segment endpoint that is
    //   - within ray's segment
    //   - closest to ray start
    var endpointsInRay = segmentEndpointsInRay(rayish, segment);
    return nearest(rayish.start, endpointsInRay);
  }
}

function segmentEndpointsInRay(rayish, segment) {
  var raySegment = new Segment2(rayish.start, rayish.end);

  return [segment.start, segment.end].filter(function(p) {
    return raySegment.containsPoint(p);
  });
}

function nearest(target, others) {
  var smallestDistance = Number.MAX_VALUE;
  var closest = null;

  others.forEach(function(point) {
    var distance = target.distance(point);
    if (distance < smallestDistance) {
      smallestDistance = distance;
      closest = point;
    }
  });

  return closest;
}

module.exports = rayVsLineSegment;
