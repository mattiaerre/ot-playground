const arabic2roman = require('./arabic2roman');

arabic2roman({ data: { arabic: 2016 } }, (error, data) => {
  console.log('data:', data);
});
