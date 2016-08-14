'use strict';

var input = require('./input');

var backlogId = '56fa66d4e27fb60d8164b285';

var result = [];

input.cards.forEach(function (card) {
  if (card.idList === backlogId && card.closed === false) {
    var abstract = {
      idShort: card.idShort,
      name: card.name,
      shortUrl: card.shortUrl,
      url: card.url
    };

    result.push(abstract);
  }
}, this);

result.sort(function (a, b) {
  return parseInt(a.idShort) - parseInt(b.idShort);
});

console.log('result.length:', result.length);

var fs = require('fs');
fs.writeFile('./output.json', JSON.stringify(result), function (err) {
  if (err) {
    return console.log(err);
  }

  console.log('output.json saved');
}); 