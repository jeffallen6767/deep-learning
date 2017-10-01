// i.e. The Method of Least Squares
// see: http://www.stat.ucla.edu/history/legendre.pdf

// y = mx + b
// m is slope, b is y-intercept
function leastSquares(b, m, coordinates) {
  var
    totalError = 0,
    len = coordinates.length,
    i,
    coord,
    x,y;
  
  for (i=0; i< len; i++) {
    coord = coordinates[i];
    x = coord[0];
    y = coord[1];
    totalError += Math.pow((y - (m * x + b)), 2);
  }
  
  return totalError / len;
}

module.exports = leastSquares;
