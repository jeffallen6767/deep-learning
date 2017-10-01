// i.e. Linear Regression
// see: legendre.js + debye.js

function step(b_current, m_current, num_points, delta, rate, points) {
  var 
    b_gradient = 0,
    m_gradient = 0,
    point,
    x,y,z,
    i;
  
  for (i=0; i<num_points; i++) {
    point = points[i];
    x = point[0];
    y = point[1];
    z = y - ((m_current * x) + b_current);
    b_gradient += delta * z;
    m_gradient += delta * x * z;
  }
  
  return [
    b_current - (rate * b_gradient),
    m_current - (rate * m_gradient)
  ];
}

function linearRegression(starting_b, starting_m, learning_rate, num_iterations, points) {
  var
    b = starting_b,
    m = starting_m,
    x = points.length,
    y = -(2/x),
    z,
    i;
  
  for (i=0; i<num_iterations; i++) {
    z = step(b, m, x, y, learning_rate, points);
    b = z[0];
    m = z[1];
  }
  
  return [b, m];
}

module.exports = linearRegression;
