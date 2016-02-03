define(['text!app/templates/directives/test1.html'], function(test1Template) {
  return [
    function () {
      return {
        template: test1Template,
        restrict: 'E',
        scope: {},
        require: 'ngModel',
        link: function (scope, element, attrs, ngModelCtrl) {
          ngModelCtrl.$render = function () {
            scope.model = ngModelCtrl.$viewValue;
          };
        }
      };
    }
  ];
});
