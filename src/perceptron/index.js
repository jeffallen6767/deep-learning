// the perceptron
// see: http://citeseerx.ist.psu.edu/viewdoc/download?doi=10.1.1.335.3398&rep=rep1&type=pdf
// and: http://www.nytimes.com/1958/07/08/archives/new-navy-device-learns-by-doing-psychologist-shows-embryo-of.html
var
  helpers = require("../helpers.js"),
  one_or_zero = helpers.one_or_zero,
  choice = helpers.choice;

function dot(one, two) {
  var len = one.length,
    result = 0,
    i;
  for (i=0; i<len; i++) {
    result += one[i] * two[i];
  }
  return result;
}

// learning_rate, num_iterations, training_data
function perceptron(rate, num, data) {
  var
    count = data.length,
    baseline = data[0][0],
    size = baseline.length,
    weights = baseline.map(function(val) {
      return Math.random();
    }),
    calc = function(x) {
      return dot(x, weights);
    },
    rnd,
    input,
    truth,
    error,
    result,
    i;
  
  for (i=0; i<num; i++) {
    // choose
    rnd = choice(data, count);
    input = rnd[0];
    truth = rnd[1];
    // calc
    result = calc(input);
    // test
    error = truth - one_or_zero(result);
    // learn
    weights = weights.map(function(weight, idx) {
      return weight + rate * error * input[idx];
    });
  }
  
  return {
    "compute": calc
  };
}

module.exports = perceptron;
