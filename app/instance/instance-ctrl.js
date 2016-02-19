define([], function() {
  return [
    '$scope',
    '$stateParams',
    function($scope, $stateParams) {
      $scope.hostname = $stateParams.hostname;
    }
  ];
});
