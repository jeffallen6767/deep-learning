// Artificial Neural Networks via back-propagation
// see: https://www.iro.umontreal.ca/~vincentp/ift3395/lectures/backprop_old.pdf

var
  helpers = require("../helpers.js"),
  one_or_zero = helpers.one_or_zero;

function matrixMultiply(one, two, debug) {
  var
    oneRows = one.length,
    rowOne = one[0],
    oneCols = rowOne.length,
    twoRows = two.length,
    rowTwo = two[0],
    twoCols = rowTwo.length,
    result = [],
    i,j,k,
    x,y,z,w;
  
  for (i=0; i<oneRows; i++) {
    rowOne = one[i];
    x = [];
    if (debug) {
      //console.log("i", i, "rowOne", rowOne);
    }
    for (j=0; j<twoCols; j++) {
      y = 0;
      for (k=0; k<oneCols; k++) {
        w = rowOne[k];
        z = two[k][j];
        y += w * z;
        if (debug) {
          //console.log("w", w, "z", z, "y", y);
        }
      }
      x.push(y);
    }
    result.push(x);
  }
  if (debug) {
    //console.log("matrixMultiply", one, two, result);
  }
  return result;
}

function nonlin(x, deriv, debug) {
  var result = deriv
    ? x.map(function(val) {
      return Array.isArray(val)
        ? nonlin(val, deriv, debug)
        : val * (1-val);
    })
    : x.map(function(val) {
      return Array.isArray(val)
        ? nonlin(val, deriv, debug)
        : 1/(1+Math.exp(-val));
    });
  if (debug) {
    //console.log("nonlin", x, deriv, result);
  }
  return result;
}

function dot(one, two, debug) {
  var len = one.length,
    result = 0,
    i;
  for (i=0; i<len; i++) {
    result += one[i] * two[i];
  }
  if (debug) {
    //console.log("dot", one, two, result);
  }
  return result;
}

function crossProduct(one, two, debug) {
  var len = one.length,
    result = [],
    i;
  for (i=0; i<len; i++) {
    result.push(
      one[i] * two[i]
    );
  }
  if (debug) {
    //console.log("crossProduct", one, two, result);
  }
  return result;
}


function matrixVectorMultiply(one, two, debug) {
  var 
    rows = one.length,
    cols,
    result = [],
    i,j,
    x,y,z;
  for (i=0; i<rows; i++) {
    x = one[i];
    cols = x.length;
    z = 0;
    for (j=0; j<cols; j++) {
      z += x[j] * two[j]
    }
    //console.log(i, x, y, z);
    result.push(z);
  }
  if (debug) {
    //console.log("matrixVectorMultiply", one, two, result);
  }
  return result;
}

function add(one, two, debug) {
  var len = one.length,
    result = [],
    i;
  for (i=0; i<len; i++) {
    result.push(
      [one[i][0] + two[i][0]]
    );
  }
  if (debug) {
    //console.log("add", one, two, result);
  }
  return result;
}

function diff(one, two, debug) {
  var len = one.length,
    result = [],
    i;
  for (i=0; i<len; i++) {
    result.push(
      [one[i][0] - two[i][0]]
    );
  }
  if (debug) {
    //console.log("diff", one, two, result);
  }
  return result;
}

function mult(one, two, debug) {
  var len = one.length,
    result = [],
    i;
  for (i=0; i<len; i++) {
    result.push(
      [one[i][0] * two[i][0]]
    );
  }
  if (debug) {
    //console.log("mult", one, two, result);
  }
  return result;
}

/*
Three-by-two array of random numbers from [-5, 0):
>>> 5 * np.random.random_sample((3, 2)) - 5
array([[-3.99149989, -0.52338984],
       [-2.99091858, -0.79479508],
       [-1.23204345, -1.75224494]])
*/
function rand(y, x, size, adjust) {
  var result = [],
    i,j,k,m;
  for (i=0; i<y; i++) {
    k = [];
    for (j=0; j<x; j++) {
      m = Math.random();
      if (size) {
        m *= size;
      }
      if (adjust) {
        m += adjust;
      }
      k.push(m);
    }
    result.push(k);
  }
  return result;
}
//console.log(rand(3,2,5,-5));

function neuralNetwork(rounds, data) {
  var
    input = data.map(function(set) {
      return set[0];
    }),
    inputLength = input.length,
    inputexample = input[0],
    inputsize = inputexample.length,
    output = data.map(function(set) {
      return set[1];
    }),
    outputLength = output.length,
    outputexample = output[0],
    outputsize = outputexample.length,
    /*
    weights = inputexample.map(function(val) {
      return 2 * Math.random() - 1;
    }),
    */
    weights_0 = rand(inputsize, inputLength, 2, -1),
    weights_1 = rand(inputsize, outputsize, 2, -1),
    calc = function(x, debug) {
      return nonlin(
        matrixVectorMultiply(x, weights, debug), null, debug
      );
    },
    /*
    solve = function(x, debug) {
      return nonlin(
        crossProduct(x, weights, debug)
      );
    },
    */
    solve = function(x, debug) {
      //console.log("solve", x, weights.join(" "));
      var q = matrixMultiply([x], weights, true);
      //console.log("solve matrixMultiply", q);
      //var r = nonlin(q);
      //console.log("solve nonlin", r);
      return q;
    },
    p,q,r,s,t,u,v,
    i;
  console.log(" ");
  console.log("weights @ 0", weights.join(" "));
  console.log(" ");
  for (i=0; i<rounds; i++) {
    
    // forward propagation 1
    q = matrixMultiply(input, weights_0);
    //console.log(i, "q", q.join(" "));
    r = nonlin(q, false);
    //console.log(i, "r", r.join(" "));
    
    // forward propagation 2
    q1 = matrixMultiply(r, weights_1);
    r1 = nonlin(q1, false);
    
    // how much did we miss?
    //console.log(i, "output", output.join(" "));
    //s = diff(r, output);
    s = diff(output, r1);
    //console.log(i, "s", s.join(" "));
    
    // slope of the sigmoid at the values in q
    t = nonlin(r1, true);
    //console.log(i, "t", t.join(" "));
    
    // multiply how much we missed by the slope
    u = mult(s, t);
    //console.log(i, "u", u.join(" "));
    
    
    // calc amount to update weights
    v = matrixMultiply(input, u);
    //console.log(i, "v", v.join(" "));
    
    // update weights
    weights = add(weights, v);
    //console.log(i, "weights", weights.join(" "));
    //console.log(" ");
    /*
    // forward propagation
    q = calc(input);
    //console.log(i, "q", q);
    
    // how much did we miss?
    r = diff(output, q);
    //console.log(i, "r", r);
    
    // slope of the sigmoid at the values in q
    s = nonlin(q, true);
    //console.log(i, "s", s);
    
    // multiply how much we missed by the slope
    t = mult(r, s);
    //console.log(i, "t", t);
    
    //u = dot(input, t, true);
    u = matrixVectorMultiply(input, t);
    //console.log(i, "u", u);
    
    // update weights
    weights = add(weights, u);
    //console.log("weights", weights);
    //+= dot(input, t);
    //console.log(" ");
    */
  }
  console.log(" ");
  console.log("weights @", rounds, weights.join(" "));
  console.log(" ");
  return {
    "compute": solve
  };
}

module.exports = neuralNetwork;
