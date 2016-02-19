define([
    'text!app/homepage/application.html',
    'text!app/homepage/index.html',
    'text!app/instance/instances.html',
    'text!app/instance/instance.html'
  ],
  function(applicationTemplate, indexTamplate, instancesTemplate, instanceTemplate) {
    return [
      '$stateProvider',
      '$urlRouterProvider',
      function($stateProvider, $urlRouterProvider) {
        // For any unmatched url, redirect to /
        $urlRouterProvider.otherwise('/');

        $stateProvider
          .state('application', {
            url: '',
            template: applicationTemplate,
            controller: 'ApplicationCtrl'
          })
          .state('index', {
            url: '/',
            parent: 'application',
            template: indexTamplate,
            controller: 'IndexCtrl'
          })
          .state('instances', {
            url: '/instances',
            parent: 'application',
            template: instancesTemplate,
            controller: 'InstancesCtrl'
          })
          .state('instance', {
            url: '/:hostname',
            parent: 'instances',
            template: instanceTemplate,
            controller: 'InstanceCtrl'
          });
      }
    ];
  }
);
