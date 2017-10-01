var 
  gradientDecent = require("./index.js"),
  getDerivative = require("../helpers.js").getDerivative,
  val = 0.5,
  num = 60,
  rate = 0.01,
  data = {
    "x^5 - 2x^3 - 2": 1.09283743265539,
    "x^3 + 2x - 7": -1.0554667111677447
  };

/*
To test, let’s assume that the error function is Error = x^5 -2x^3-2
To know the slope of any given X value we take its derivative, which is 5x^4 - 6x^2
*/
function test() {
  Object.keys(data).forEach(function(expression) {
    var
      deriv = getDerivative(expression, 'x'),
      result = gradientDecent(deriv, val, num, rate);
    console.log("gradientDecent for", expression, "is", result);
  });
}

function getTests() {
  var tests = {};
  Object.keys(data).forEach(function(expression) {
    var 
      key = "gradientDecent for " + expression,
      expected = data[expression],
      deriv = getDerivative(expression, 'x');
    tests[key] = function(test, context) {
      test.startTime();
      var result = gradientDecent(deriv, val, num, rate);
      test.endTime();
      test.assert.identical(result, expected);
      test.done();
    };
  });
  return tests;
}

module.exports = {
  "test": test,
  "getTests": getTests
};
