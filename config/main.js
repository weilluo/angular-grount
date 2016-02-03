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
    'app/controllers/instances',
    'app/controllers/instance',
    'app/directives/test1'
  ],
  function(app, routeConig, InstancesCtrl, InstanceCtrl, test1Directive) {
    app.config(routeConig),
    app.controller('InstancesCtrl', InstancesCtrl);
    app.controller('InstanceCtrl', InstanceCtrl);

    app.directive('test1', test1Directive);

    angular.bootstrap(document, [app.name]);
  }
);
