var 
  linearRegression = require("./index.js"),
  data = {
    "linearRegression": {
      "b": 1,
      "m": 1,
      "rate": 0.01,
      "num": 100000,
      "points": [[0.5,5],[0.6,5.5],[0.8,6],[1.1,6.8],[1.4,7]],
      "expected": [4.107299270072728,2.2189781021900568]
    }
  };

function test() {
  Object.keys(data).forEach(function(key) {
    var
      obj = data[key],
      b = obj.b,
      m = obj.m,
      rate = obj.rate,
      num = obj.num,
      points = obj.points,
      expression = [key,"(",b,",",m,",",rate,",",num,",",JSON.stringify(points),")"].join(""),
      result = linearRegression(b, m, rate, num, points);
    
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
      rate = obj.rate,
      num = obj.num,
      points = obj.points,
      expected = obj.expected,
      expression = [key,"(",b,",",m,",",rate,",",num,",",JSON.stringify(points),")"].join("");
    
    tests[expression] = function(test, context) {
      test.startTime();
      var result = linearRegression(b, m, rate, num, points);
      test.endTime();
      test.assert.identical(
        JSON.stringify(result), 
        JSON.stringify(expected)
      );
      test.done();
    };
  });
  return tests;
}

module.exports = {
  "test": test,
  "getTests": getTests
};
