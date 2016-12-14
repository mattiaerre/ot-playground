'use strict';

const lookup = {
  0: '',
  1: 'I',
  2: 'II',
  3: 'III',
  4: 'IV',
  5: 'V',
  6: 'VI',
  7: 'VII',
  8: 'VIII',
  9: 'IX',
  10: 'X',
  20: 'XX',
  30: 'XXX',
  40: 'XL',
  50: 'L',
  60: 'LX',
  70: 'LXX',
  80: 'LXXX',
  90: 'XC',
  100: 'C',
  200: 'CC',
  300: 'CCC',
  400: 'CD',
  500: 'D',
  600: 'DC',
  700: 'DCC',
  800: 'DCCC',
  900: 'CM',
  1000: 'M',
  2000: 'MM',
  3000: 'MMM'
};

const arabic2roman = (arabic) => {
  const collection = arabic.toString().split('').map((element, index) => (
    parseInt(element, 10) * Math.pow(10, arabic.toString().length - index - 1)
  ));
  let roman = '';
  collection.forEach((element) => {
    roman += lookup[element];
  });
  return roman;
};

module.exports = (context, cb) => {
  const arabic = context.data.arabic;
  cb(null, { arabic, roman: arabic2roman(context.data.arabic) });
};
