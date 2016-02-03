requirejs(['config'], function(config) {
  requirejs.config(config);

  requirejs(
    [
      'app/app',
      'app/route',
      'app/controllers/instances',
      'app/controllers/instance'
    ],
    function(app, routeConig, InstancesCtrl, InstanceCtrl) {
      app.config(routeConig),
      app.controller('InstancesCtrl', InstancesCtrl);
      app.controller('InstanceCtrl', InstanceCtrl);

      angular.bootstrap(document, [app.name]);
    }
  );
});
