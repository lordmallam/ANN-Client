'use strict';

/**
 * @ngdoc directive
 * @name annClientApp.directive:datePicker
 * @description
 * # datePicker
 */
angular.module('annClientApp')
  .directive('datePicker', function () {
    return {
      restrict: 'E',
      require: '^ngModel',
      scope: {
        ngModel: '=',
        id: '@',
        initialDate: '@'
      },
      template: `<div class="ui calendar" id="{{id}}"> 
                    <div class="ui input left icon">
                      <i class="calendar icon"></i>
                      <input type="text" placeholder="e.g January 31, 1980"/>
                    </div>
                 </div>`,
      link: (scope, element, attrs, ngModel) => {
        const getDate = (d, t, m) => {
          scope.ngModel = d;         
        };
        var cal = $(element).calendar({
          type: 'date', onChange: getDate
        });
        let watch = 1;
        scope.$watch(() => (scope.ngModel), (newValue) => {
          if (newValue && watch) {
            watch = 0;
            cal.calendar('set date', moment(newValue).format('M/D/YYYY'));
          }          
        })
      }
    };
  });
