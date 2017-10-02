// Artificial Neural Networks via back-propagation
// see: https://www.iro.umontreal.ca/~vincentp/ift3395/lectures/backprop_old.pdf

var
  helpers = require("../helpers.js"),
  math = helpers.math,
  one_or_zero = helpers.one_or_zero,
  sigmoid = helpers.sigmoid;

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

function matrixMultiply(one, two, debug) {
  if (debug) {
    console.log("matrixMultiply", one, two);
  }
  var
    oneRows = one.length, // 4
    rowOne = one[0],
    oneCols = rowOne.length, // 3
    twoRows = two.length, // 3
    rowTwo = two[0],
    twoCols = rowTwo.length, // 4
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
    console.log("matrixMultiply-result", result);
  }
  return result;
}

function matrixVectorMultiply(one, two, debug) {
  if (debug) {
    console.log("matrixVectorMultiply", one, two);
  }
  var 
    rows = one.length,
    cols,
    result = [],
    i,j,
    u,v,w,
    x,y,z;
  for (i=0; i<rows; i++) {
    x = one[i];
    cols = x.length;
    z = 0;
    for (j=0; j<cols; j++) {
      u = x[j];
      v = two[j];
      v = Array.isArray(v) ? v[0] : v;
      w = u * v;
      z += w;
      //console.log(i, j, u, v, w, z);
    }
    result.push(z);
  }
  if (debug) {
    console.log("matrixVectorMultiply-result", result);
  }
  return result;
}

function scalarSigmoid(val) {
  return 1 / (1 + Math.exp(-val));
}

function vectorSigmoid(vector) {
  return vector.map(scalarSigmoid);
}

function matrixSigmoid(matrix) {
  return matrix.map(vectorSigmoid);
}

function scalarDerivative(val) {
  return val * (1-val);
}

function vectorDerivative(vector) {
  return vector.map(scalarDerivative);
}

function matrixDerivative(matrix) {
  return matrix.map(vectorDerivative);
}

function diff(one, two, debug) {
  if (debug) {
    console.log("diff", one, two);
  }
  var len = one.length,
    result = [],
    count,
    row,
    i,j,
    z;
  for (i=0; i<len; i++) {
    row = one[i];
    count = row.length;
    z = [];
    for (j=0; j<count; j++) {
      z.push(
        row[j] - two[i]
      );
    }
    result.push(z);
  }
  if (debug) {
    console.log("diff-result", result);
  }
  return result;
}

function mult(one, two, debug) {
  if (debug) {
    console.log("mult", one, two);
  }
  var len = one.length,
    result = [],
    i;
  for (i=0; i<len; i++) {
    result.push(
      [one[i][0] * two[i]]
    );
  }
  if (debug) {
    console.log("mult-result", result);
  }
  return result;
}

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
    layer_1 = {
      "_name": "Layer 1",
      "weights": rand(inputsize, inputLength, 2, -1)
    },
    layer_2 = {
      "_name": "Layer 2",
      "weights": rand(inputLength, outputsize, 2, -1)
    },
    outWeight = function outWeight(label, weights) {
      var
        yLen = weights.length,
        xLen = weights[0].length,
        result = ["",label],
        x,y,z;
      
      for (y=0; y<yLen; y++) {
        x = weights[y];
        result.push(
          x.map(function(val) {
            return val < 0 ? val : "+" + val;
          }).join(", ")
        );
      }
      result.push("");
      return result.join("\n");
    },
    solve = function(x, debug) {
      console.log("solve", x);

      return 0;
    },

    i;
  
  //console.log(outWeight("input", input));
  //console.log(outWeight("output", output));
  
  //console.log(outWeight("weights_0", weights_0));
  //console.log(outWeight("weights_1", weights_1));
  
  for (i=0; i<rounds; i++) {
    
    layer_1.dot = matrixMultiply(input, layer_1.weights);
    layer_1.sigmoid = matrixSigmoid(layer_1.dot);

    layer_2.dot = matrixVectorMultiply(layer_1.sigmoid, layer_2.weights);
    layer_2.sigmoid = vectorSigmoid(layer_2.dot);

    layer_2.error = diff(output, layer_2.sigmoid);
    layer_2.derivative = vectorDerivative(layer_2.sigmoid);
    layer_2.delta = mult(layer_2.error, layer_2.derivative);

    layer_1.error = matrixMultiply(layer_2.delta, layer_2.weights);
    layer_1.derivative = matrixDerivative(layer_1.sigmoid);
    layer_1.delta = matrixVectorMultiply(layer_1.derivative, layer_1.error);

    layer_2.adjustment = matrixVectorMultiply(layer_1.sigmoid, layer_2.delta);
    layer_2.weights = diff(layer_2.weights, layer_2.adjustment);

    layer_1.adjustment = matrixVectorMultiply(input, layer_1.delta);
    layer_1.weights = diff(layer_1.weights, layer_1.adjustment);

  }
  
  console.log(" ");
  console.log("layer_1");
  console.log(layer_1);
  console.log(" ");
  console.log("layer_2");
  console.log(layer_2);
  console.log(" ");
  
  return {
    "compute": solve
  };
}

module.exports = neuralNetwork;

/*

    //////////////////
    
    layer_1_A,
    layer_1_B, 
    
    layer_2_A,
    layer_2_B,
    
    layer_1_deriv,
    layer_2_deriv,
    
    layer_1_delta,
    layer_2_delta,
    
    layer_1_error,
    layer_2_error,
    
    adjustment_A,
    adjustment_B,
    
    
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

*/


/*
    layer_2 = sigmoid(
      dot(layer_1, weights_1)
    );
    console.log("layer_2", layer_2);
    */
    
    /*
    // forward propagation 1
    q = matrixMultiply(input, weights_0);
    console.log(i, "q", q.join(" "));
    r = nonlin(q, false);
    console.log(i, "r", r.join(" "));
    
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
    