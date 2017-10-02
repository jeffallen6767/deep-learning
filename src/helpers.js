var math = require("mathjs");

function getDerivative(expression, variable) {
  var 
    node = math.derivative(expression, variable),
    derivative = function derivative(x) {
      var obj = {};
      obj[variable] = x;
      return node.eval(obj);
    };
  return derivative;
};

function one_or_zero(x) {
  return x < 0 ? 0 : 1;
}

function choice(choices, count) {
  return choices[
    Math.floor((count || choices.length) * Math.random())
  ];
}

function sigmoid(t) {
    return 1/(1+Math.pow(Math.E, -t));
}

module.exports = {
  "math": math,
  "getDerivative": getDerivative,
  "one_or_zero": one_or_zero,
  "choice": choice,
  "sigmoid": sigmoid
};