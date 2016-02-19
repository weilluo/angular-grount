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

    'app/directives/test1-directive',

    'app/services/demo',

    'app/homepage/application-ctrl',
    'app/homepage/index-ctrl',

    'app/instance/instances-ctrl',
    'app/instance/instance-ctrl'
  ],
  function(app, routeConig, test1Directive, demoService, ApplicationCtrl, IndexCtrl, InstancesCtrl, InstanceCtrl) {
    app.config(routeConig);

    app.directive('test1', test1Directive);

    app.factory('test1', demoService);

    app.controller('ApplicationCtrl', ApplicationCtrl);
    app.controller('IndexCtrl', IndexCtrl);

    app.controller('InstancesCtrl', InstancesCtrl);
    app.controller('InstanceCtrl', InstanceCtrl);

    angular.bootstrap(document, [app.name]);
  }
);
