var 
  helpers = require("../helpers.js"),
  one_or_zero = helpers.one_or_zero,
  neuralNetwork = require("./index.js"),
  data = {
    "XOR neural network": {
      "rounds": 1,//10000
      "training_data": [
        [[0,0,1], [0]],
        [[0,1,1], [1]],
        [[1,0,1], [1]],
        [[1,1,1], [0]]
      ]
    }
  };

function test() {
  Object.keys(data).forEach(function(key) {
    var 
      obj = data[key],
      rounds = obj.rounds,
      training_data = obj.training_data,
      node = neuralNetwork(rounds, training_data);//<-- you are here
    // see if the node computes correctly:
    console.log(key);
    training_data.forEach(function(set, idx) {
      var
        input = set[0],
        result = node.compute(input, true);
      console.log([input[0], " xor ", input[1], " = ", one_or_zero(result), "  [", result, "]"].join(""));
    });
    console.log(" ");
  });
}
test();
/* TODO
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
*/
module.exports = {
  "test": test,
  //"getTests": getTests
};
