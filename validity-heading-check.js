(function () {
  var validityHeading = 'Valid for:';
  var longestHeadingLength = "空席状況".length;
  console.log('longestHeadingLength:', longestHeadingLength);

  var result = validityHeading.substr(0, validityHeading.length - 1) + Array(longestHeadingLength + 1 - validityHeading.length).join(".");
  console.log('result:', result);
})();
