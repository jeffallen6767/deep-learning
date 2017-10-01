var 
  fs = require("fs"),
  context = require("./index"),
  tester = require("testing"),
  testDir = "./src",
  tests = {};

fs.readdirSync(testDir).forEach(function(file) {
  var 
    testPath = [testDir, file].join("/"),
    testFile = [testPath, "test.js"].join("/"),
    isDir = fs.lstatSync(testPath).isDirectory(),
    testGetter = isDir && require(testFile).getTests,
    testData = testGetter && testGetter(),
    testKeys = (testData && Object.keys(testData)) || [];
  
  testKeys.forEach(function(testKey) {
    var 
      test = testData[testKey],
      key = [testPath, testKey].join(" - ");
    
    tests[key] = test;
  });
});

tester.run(tests, context);
