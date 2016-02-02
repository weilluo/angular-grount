define(
  [
    'angular',
    'app/route',
    'app/controllers/instances'
  ],
  function(angular, routeConfig, InstancesCtrl) {
    var app = angular.module('DemoApp', ['ngRoute']);

    app.config(routeConfig);

    app.controller('InstancesCtrl', InstancesCtrl);

    angular.element(document).ready(function() {
      angular.bootstrap(document, ['DemoApp']);
    });

    return app;
  }
);
