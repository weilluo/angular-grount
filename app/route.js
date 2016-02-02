define(['angular-route'], function() {
  return [
    '$routeProvider',
    function($routeProvider) {
      $routeProvider.
        when('/', {redirectTo: '/instances'}).

        when('/instances', {
          templateUrl: 'app/templates/instances.html',
          controller: 'InstancesCtrl'
        }).

        when('/instances/:hostname', {
          templateUrl: 'app/templates/index.html',
          controller: 'InstanceCtrl'
        }).

        otherwise({redirectTo: '/'});
    }
  ];
});
