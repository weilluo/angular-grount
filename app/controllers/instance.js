define([], function() {
  return [
    '$scope',
    '$routeParams',
    function($scope, $routeParams) {
      $scope.hostname = $routeParams.hostname;
    }
  ];
});
