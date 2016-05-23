var expect = require('chai').expect;
var sinon = require('sinon'); // see: http://sinonjs.org/docs/#clock

// interfaces
var api = { INIT: 'init' };
var messages = { INITIALISED: 'initialised' };

// system under test
/*
var component = { _promise: new Promise() };
component[api.INIT] = function (options) {
  this._promise.resolve(function () {
    var that = this;
    var timeoutId = setTimeout(function () {
      clearTimeout(timeoutId);
      that._promise.resolve(messages.INITIALISED);
    }, 200);
  });
  return this._promise;
}
*/

function componentFactory() {
  var _promise = new Promise(function (resolve, reject) {
    var that = this;
    var timeoutId = setTimeout(function () {
      clearTimeout(timeoutId);
      resolve('WTH!');
    }, 200);
  });

  return {
    [api.INIT]: function (options) {
      return _promise;
    }
  };
}

function another() {
  var _promise = new Promise(function (resolve, reject) {
    var timeoutId = setTimeout(function () {
      clearTimeout(timeoutId);
      resolve('WTH!');
    }, 200);
  });

  function init(options) {
    console.log(options);
    return _promise;
  }
  return { [api.INIT]: init };
}

// helpers
function logNow(id) {
  console.log('id:', id, 'now:', Date.now());
}

// INFO: this is still a WIP

// specs
describe('promise', function () {
  describe('given a component', function () {

    var component;

    before(function () {
      component = another();
    });

    after(function () {
      component = null;
    });

    describe('when "' + api.INIT + '" 1st time', function () {
      it('then "' + messages.INITIALISED + '"', function () {
        component[api.INIT]({ id: 1 }).then(function (message) {
          logNow(1);
          expect(true).to.be.equal(false);
          expect(message).to.equal(messages.INITIALISED);
        });
      });

      describe('and when "' + api.INIT + '" 2nd time', function () {
        it('then "' + messages.INITIALISED + '"', function () {
          component[api.INIT]({ id: 2 }).then(function (message) {
            logNow(2);
            expect(message).to.equal(messages.INITIALISED);
          });
        });
      });

      describe('and when "' + api.INIT + '" 3rd time', function () {
        it('then "' + messages.INITIALISED + '"', function () {
          component[api.INIT]({ id: 3 }).then(function (message) {
            logNow(3);
            expect(message).to.equal(messages.INITIALISED);
          });
        });
      });
    });
  });
});
