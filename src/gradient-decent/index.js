// i.e. Gradient Descent
// see: https://www.abebooks.de/erstausgabe/N%C3%A4herungsformeln-Zylinderfunktionen-gro%C3%9Fe-Werte-Arguments-unbeschr%C3%A4nkt/5088409685/bd

function gradientDecent(method, current_val, num_iterations, learning_rate) {
  /*
  The trick here is the learning_rate. 
  By going in the opposite direction of the delta, the result approaches the minimum. 
  Additionally, the closer the result gets to the minimum, the smaller the delta gets. 
  This reduces each step as the delta approaches zero.
  */
  var 
    result = current_val,
    mod = -learning_rate,
    previous_val,
    delta,
    i;

  for (i=0; i<num_iterations; i++) {
     previous_val = result;
     delta = method(previous_val);
     result += mod * delta;
  }
  
  return result;
}

module.exports = gradientDecent;
