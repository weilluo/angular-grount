// Karma configuration
// Generated on Wed Feb 17 2016 14:54:42 GMT+0800 (SGT)

module.exports = function(config) {
  var dependencies = [
    'bower_components/angular/angular.js',
    'bower_components/angular-mocks/angular-mocks.js'
  ];

  config.set({
    basePath: './',

    files: dependencies.concat([
      { pattern: 'app/**/*.js', included: false },
      { pattern: 'tests/units/**/*spec.js', included: false },
      { pattern: 'tests/units/test-main.js', included: true }
    ]),

    exclude: [],

    frameworks: ['mocha', 'requirejs', 'chai', 'sinon'],
    reporters: ['mocha', 'dots'],

    browsers: ['PhantomJS'],
    singleRun: true
  });
};
