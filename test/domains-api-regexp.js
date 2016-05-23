var Joi = require('joi');
var expect = require('chai').expect;

describe('given a domains regexp', function () {
  var regexp = new RegExp('^(com|comau|commx|couk|de|ie|jp)$', 'i');
  var schema = {
    'x-ot-domain': Joi.string().regex(regexp).optional()
  };
  var keys;

  keys = ['com', 'couk', undefined];
  keys.forEach(function (key) {
    describe('when the domain key is ' + key, function () {
      it('then the regexp matches', function () {
        Joi.validate({ 'x-ot-domain': key }, schema, function (error, value) {
          expect(error).to.equal(null);
        });
      });
    });
  }, this);

  keys = ['commmm', 'fr', 'it'];
  keys.forEach(function (key) {
    describe('when the domain key is ' + key, function () {
      it('then the regexp doesn\'t match', function () {
        Joi.validate({ 'x-ot-domain': key }, schema, function (error, value) {
          expect(error).to.not.equal(null);
          console.log('error:', error.details[0].message);
        });
      });
    });
  }, this);
});