define([
    'text!app/templates/instances.html',
    'text!app/templates/instance.html'
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
