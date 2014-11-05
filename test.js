var assert = require('assert');
var findIntersectionPoint = require('./');

describe('rayVsLineSegment()', function() {
  var segment, rayish;

  beforeEach(function() {
    segment = {
      start: {x: 5, y: 5},
      end: {x: 8, y: 8}
    };
  });

  describe('ray and segment are not colinear', function() {
    it('returns intersection point when ray cross middle of segment', function() {
      rayish = createRay(6, 0, 6, 10);

      var point = findIntersectionPoint(rayish, segment);

      assert.equal(point.x, 6);
      assert.equal(point.y, 6);
    });

    it('returns null when ray doesn\'t hit segment', function() {
      rayish = createRay(3, 10, 6, 7);

      var point = findIntersectionPoint(rayish, segment);

      assert.strictEqual(point, null);
    });

    it('returns null when ray is parallel to segment', function() {
      rayish = createRay(6, 5, 9, 8);

      var point = findIntersectionPoint(rayish, segment);

      assert.strictEqual(point, null);
    });

    it('returns ray start when ray starts in middle of segment', function() {
      rayish = createRay(6, 6, 6, 10);

      var point = findIntersectionPoint(rayish, segment);

      assert.equal(point.x, 6);
      assert.equal(point.y, 6);
    });

    it('returns segment start when ray starts at segment start', function() {
      rayish = createRay(5, 5, 6, 10);

      var point = findIntersectionPoint(rayish, segment);

      assert.equal(point.x, 5);
      assert.equal(point.y, 5);
    });

    it('returns segment end when ray starts at segment end', function() {
      rayish = createRay(8, 8, 6, 10);

      var point = findIntersectionPoint(rayish, segment);

      assert.equal(point.x, 8);
      assert.equal(point.y, 8);
    });
  });

  describe('ray and segment are colinear', function() {
    it('returns null when ray doesn\'t reach segment', function() {
      rayish = createRay(2, 2, 3, 3);

      var point = findIntersectionPoint(rayish, segment);

      assert.strictEqual(point, null);
    });

    it('returns ray start when ray starts in middle of segment', function() {
      rayish = createRay(7, 7, 3, 3);

      var point = findIntersectionPoint(rayish, segment);

      assert.equal(point.x, 7);
      assert.equal(point.y, 7);
    });

    it('returns segment start when ray overlaps from segment start side', function() {
      rayish = createRay(3, 3, 7, 7);

      var point = findIntersectionPoint(rayish, segment);

      assert.equal(point.x, 5);
      assert.equal(point.y, 5);
    });

    it('returns segment end when ray overlaps from segment end side', function() {
      rayish = createRay(10, 10, 7, 7);

      var point = findIntersectionPoint(rayish, segment);

      assert.equal(point.x, 8);
      assert.equal(point.y, 8);
    });
  });
});

function createRay(x1, y1, x2, y2) {
  return {
    start: {
      x: x1,
      y: y1
    },
    end: {
      x: x2,
      y: y2
    }
  };
}
