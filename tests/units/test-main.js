var allTestFiles = [];
var TEST_REGEXP = /(spec|test)\.js$/i;
Object.keys(window.__karma__.files).forEach(function(file) {
  if (TEST_REGEXP.test(file)) {
    allTestFiles.push(file);
  }
});

require.config({
  // Karma serves files from '/base'
  "baseUrl": "/base",

  "paths": {},
  "shim": {},

  // dynamically load all test files
  deps: allTestFiles,

  // we have to kickoff jasmine, as it is asynchronous
  callback: window.__karma__.start
});

require(
  [
    'app/services/demo'
  ],
  function(demoService) {
    var app = angular.module('DemoAppTest', []);

    app.factory('demo', demoService);
    angular.bootstrap(document, [app.name]);
  }
);
