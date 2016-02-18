require.config({
  "app_name": "Demo",
  "baseUrl": "./assets",

  "paths": {
    'text': 'require-text'
  },

  "shim": {
  }
});

require(
  [
    'app/app',
    'app/route',
    'app/instance/instances-ctrl',
    'app/instance/instance-ctrl',
    'app/directives/test1-directive',
    'app/services/demo'
  ],
  function(app, routeConig, InstancesCtrl, InstanceCtrl, test1Directive, demoService) {
    app.config(routeConig),
    app.controller('InstancesCtrl', InstancesCtrl);
    app.controller('InstanceCtrl', InstanceCtrl);

    app.directive('test1', test1Directive);

    app.factory('test1', demoService);

    angular.bootstrap(document, [app.name]);
  }
);
