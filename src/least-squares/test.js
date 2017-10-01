var 
  leastSquares = require("./index.js"),
  data = {
    "leastSquares": {
      "b": 1, 
      "m": 2, 
      "coords": [[3,6],[6,9],[12,18]],
      "expected": 22
    }
  };

function test() {
  Object.keys(data).forEach(function(key) {
    var
      obj = data[key],
      b = obj.b,
      m = obj.m,
      coords = obj.coords,
      expression = [key,"(",b,",",m,",",JSON.stringify(coords),")"].join(""),
      result = leastSquares(b, m, coords);
    
    console.log(expression, "==", result);
  });
}

function getTests() {
  var tests = {};
  Object.keys(data).forEach(function(key) {
    var 
      obj = data[key],
      b = obj.b,
      m = obj.m,
      coords = obj.coords,
      expected = obj.expected,
      expression = [key,"(",b,",",m,",",JSON.stringify(coords),")"].join("");
    
    tests[expression] = function(test, context) {
      test.startTime();
      var result = leastSquares(b, m, coords);
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
