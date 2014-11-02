var assert = require('assert');
var Segment2 = require('segment2');
var Vec2 = require('vec2');
var Rayish = require('rayish');

var findIntersectionPoint = require('./');

describe('rayVsLineSegment()', function() {
  var segment, rayish;

  beforeEach(function() {
    segment = new Segment2(new Vec2(5, 5), new Vec2(8, 8));
  });

  describe('ray and segment are not colinear', function() {
    it('returns intersection point when ray cross middle of segment', function() {
      rayish = new Rayish(new Vec2(6, 0), new Vec2(6, 10));

      var point = findIntersectionPoint(rayish, segment);

      assert.equal(point.x, 6);
      assert.equal(point.y, 6);
    });

    it('returns null when ray doesn\'t hit segment', function() {
      rayish = new Rayish(new Vec2(3, 10), new Vec2(6, 7));

      var point = findIntersectionPoint(rayish, segment);

      assert.strictEqual(point, null);
    });

    it('returns ray start when ray starts in middle of segment', function() {
      rayish = new Rayish(new Vec2(6, 6), new Vec2(6, 10));

      var point = findIntersectionPoint(rayish, segment);

      assert.equal(point.x, 6);
      assert.equal(point.y, 6);
    });

    it('returns segment start when ray starts at segment start', function() {
      rayish = new Rayish(new Vec2(5, 5), new Vec2(6, 10));

      var point = findIntersectionPoint(rayish, segment);

      assert.equal(point.x, 5);
      assert.equal(point.y, 5);
    });

    it('returns segment end when ray starts at segment end', function() {
      rayish = new Rayish(new Vec2(8, 8), new Vec2(6, 10));

      var point = findIntersectionPoint(rayish, segment);

      assert.equal(point.x, 8);
      assert.equal(point.y, 8);
    });
  });

  describe('ray and segment are colinear', function() {
    it('returns null when ray doesn\'t reach segment', function() {
      rayish = new Rayish(new Vec2(2, 2), new Vec2(3, 3));

      var point = findIntersectionPoint(rayish, segment);

      assert.strictEqual(point, null);
    });

    it('returns ray start when ray starts in middle of segment', function() {
      rayish = new Rayish(new Vec2(7, 7), new Vec2(3, 3));

      var point = findIntersectionPoint(rayish, segment);

      assert.equal(point.x, 7);
      assert.equal(point.y, 7);
    });

    it('returns segment start when ray overlaps from segment start side', function() {
      rayish = new Rayish(new Vec2(3, 3), new Vec2(7, 7));

      var point = findIntersectionPoint(rayish, segment);

      assert.equal(point.x, 5);
      assert.equal(point.y, 5);
    });

    it('returns segment end when ray overlaps from segment end side', function() {
      rayish = new Rayish(new Vec2(10, 10), new Vec2(7, 7));

      var point = findIntersectionPoint(rayish, segment);

      assert.equal(point.x, 8);
      assert.equal(point.y, 8);
    });
  });
});
