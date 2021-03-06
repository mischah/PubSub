/**
 * Test specification for PubSub
 *
 * Tests with Jasmine
 */

var PubSub = require('../PubSub');

describe('PubSub', function () {
  it('exisits', function () {
    expect(PubSub).not.toBe(undefined);
  });

  it('subscribes function', function () {
    var fn = function () {};
    var fn2 = function () {};

    expect(PubSub._storage.fn).toBe(undefined);

    PubSub.subscribe('fn', fn);
    expect(PubSub._storage.fn).toEqual([fn]);

    PubSub.subscribe('fn', fn2);
    expect(PubSub._storage.fn).toEqual([fn, fn2]);
  });

  it('subscribes array of functions', function () {
    var fns = [function () {}, function () {}];

    expect(PubSub._storage.array).toBe(undefined);
    PubSub.subscribe('array', fns);

    expect(PubSub._storage.array).toEqual(fns);
  });

  it('unsubscribes function', function () {
    var fn = function () {};

    expect(PubSub._storage.unsubscribeFn).toBe(undefined);

    PubSub.subscribe('unsubscribeFn', fn);
    expect(PubSub._storage.unsubscribeFn).toEqual([fn]);

    PubSub.unsubscribe('unsubscribeFn', fn);

    expect(PubSub._storage.unsubscribeFn).toEqual([]);
  });

  it('unsubscribes functions', function () {
    var fn = function () {};
    var fn2 = function () {};

    expect(PubSub._storage.unsubscribeArray).toBe(undefined);

    PubSub.subscribe('unsubscribeArray', [fn, fn2]);
    expect(PubSub._storage.unsubscribeArray).toEqual([fn, fn2]);

    PubSub.unsubscribe('unsubscribeArray', [fn, fn2]);

    expect(PubSub._storage.unsubscribeArray).toEqual([]);
  });

  it('publishes events', function () {
    this.fn = function () {};
    spyOn(this, 'fn');

    PubSub.subscribe('publish', this.fn);
    expect(PubSub._storage.publish).toEqual([this.fn]);

    PubSub.publish('publish');
    expect(this.fn).toHaveBeenCalled();
  });
});
