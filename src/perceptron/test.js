var 
  perceptron = require("./index.js"),
  one_or_zero = require("../helpers.js").one_or_zero,
  data = {
    "OR perceptron": {
      "operator": "or",
      "learning_rate": 0.2,
      "num_iterations": 100,
      "training_data": [
        [[0,0,1],0],
        [[0,1,1],1],
        [[1,0,1],1],
        [[1,1,1],1]
      ]
    },
    "XOR perceptron": {
      "operator": "xor",
      "learning_rate": 0.2,
      "num_iterations": 100,
      "training_data": [
        [[0,0,1],0],
        [[0,1,1],1],
        [[1,0,1],1],
        [[1,1,1],0] // <-- this is the difference
      ]
    }
  };

function test() {
  Object.keys(data).forEach(function(key) {
    var
      obj = data[key],
      operator = obj.operator,
      learning_rate = obj.learning_rate,
      num_iterations = obj.num_iterations,
      training_data = obj.training_data,
      expression = [key,"(",learning_rate,",",num_iterations,JSON.stringify(training_data),")"].join(""),
      node = perceptron(learning_rate, num_iterations, training_data);
    console.log(key);
    training_data.forEach(function(set, idx) {
      var input = set[0],
        result = node.compute(input);
      console.log([input[0], " ",operator," ", input[1], " = ", one_or_zero(result), "  [", result, "]"].join(""));
    });
    console.log(" ");
  });
}

function getTests() {
  var tests = {};
  Object.keys(data).forEach(function(key) {
    var 
      obj = data[key],
      operator = obj.operator,
      learning_rate = obj.learning_rate,
      num_iterations = obj.num_iterations,
      training_data = obj.training_data,
      expected = obj.expected,
      node = perceptron(learning_rate, num_iterations, training_data);

    training_data.forEach(function(set, idx) {
      var 
        input = set[0],
        expected = set[1],
        expression = [key, input[0], operator, input[1]].join(" ");
      
      tests[expression] = function(test, context) {
        test.startTime();
        var result = one_or_zero(
          node.compute(input)
        );
        test.endTime();
        test.assert.identical(result, expected);
        test.done();
      };
    });
  });
  return tests;
}

module.exports = {
  "test": test,
  "getTests": getTests
};
/*
// show that a perceptron can correctly compute OR
function or_test() {
  var training_data = [
      [[0,0,1],0],
      [[0,1,1],1],
      [[1,0,1],1],
      [[1,1,1],1]
    ],
    learning_rate = 0.2,
    num_iterations = 100,
    node = perceptron(training_data, learning_rate, num_iterations);
  // see if the node computes correctly:
  console.log("OR TEST:");
  training_data.forEach(function(set, idx) {
    var input = set[0],
      result = node.compute(input);
    console.log([input[0], " or ", input[1], " = ", one_or_zero(result), "  [", result, "]"].join(""));
  });
  console.log(" ");
}

// show that a perceptron cannot correctly compute XOR
function xor_test() {
  var training_data = [
      [[0,0,1],0],
      [[0,1,1],1],
      [[1,0,1],1],
      [[1,1,1],0] // <-- this is the difference
    ],
    learning_rate = 0.2,
    num_iterations = 100,
    node = perceptron(training_data, learning_rate, num_iterations);
  // see if the node computes correctly:
  console.log("XOR TEST:");
  training_data.forEach(function(set, idx) {
    var input = set[0],
      result = node.compute(input);
    console.log([input[0], " xor ", input[1], " = ", one_or_zero(result), "  [", result, "]"].join(""));
  });
  console.log(" ");
}
*/
