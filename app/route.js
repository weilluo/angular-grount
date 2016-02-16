define([
    'text!app/instance/instances.html',
    'text!app/instance/instance.html'
  ],
  function(instancesTemplate, instanceTemplate) {
    return [
      '$routeProvider',
      function($routeProvider) {
        $routeProvider.
          when('/', {
            template: instancesTemplate,
            controller: 'InstancesCtrl'
          }).

          when('/instances/:hostname', {
            template: instanceTemplate,
            controller: 'InstanceCtrl'
          }).

          otherwise({redirectTo: '/'});
      }
    ];
  }
);
