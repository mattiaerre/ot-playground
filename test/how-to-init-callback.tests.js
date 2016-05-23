var expect = require('chai').expect;
var sinon = require('sinon'); // see: http://sinonjs.org/docs/#clock

// interfaces
var api = { INIT: 'init' };
var messages = { INITIALISED: 'initialised', INITIALISING: 'initialising' };

// system under test
var component = { _initialising: false, _initialised: false };
component[api.INIT] = function (options, callback) {
  if (this._initialised) {
    return callback(null, messages.INITIALISED); // info: already initialised
  }
  if (this._initialising) {
    return callback(null, messages.INITIALISING);
  }

  this._initialising = true;

  // simulate API call
  var that = this;
  var timeoutId = setTimeout(function () {
    clearTimeout(timeoutId);
    that._initialising = false;
    that._initialised = true;
    callback(null, messages.INITIALISED);
  }, 200);
};

// helpers
function logNow(id) {
  console.log('id:', id, 'now:', Date.now());
}

// specs
describe('callback', function () {
  describe('given a component', function () {

    var clock;

    before(function () {
      clock = sinon.useFakeTimers();
    });

    after(function () {
      clock.restore();
    });

    describe('when "' + api.INIT + '" 1st time', function () {
      it('then "' + messages.INITIALISED + '"', function (done) {
        clock.tick(0);
        component[api.INIT]({ id: 1 }, function (error, message) {
          //logNow(1);
          expect(message).to.equal(messages.INITIALISED);
        });
        done();
      });

      describe('and when "' + api.INIT + '" 2nd time', function () {
        it('then "' + messages.INITIALISING + '"', function (done) {
          clock.tick(100);
          component[api.INIT]({ id: 2 }, function (error, message) {
            //logNow(2);
            expect(message).to.equal(messages.INITIALISING);
          });
          done();
        });
      });

      describe('and when "' + api.INIT + '" 3rd time', function () {
        it('then "' + messages.INITIALISED + '"', function (done) {
          clock.tick(200);
          component[api.INIT]({ id: 3 }, function (error, message) {
            //logNow(3);
            expect(message).to.equal(messages.INITIALISED);
          });
          done();
        });
      });
    });
  });
});