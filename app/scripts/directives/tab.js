'use strict';

/**
 * @ngdoc directive
 * @name annClientApp.directive:tab
 * @description
 * # tab
 */
angular.module('annClientApp')
  .directive('tab', function () {
    return {
      restrict: 'E',
      scope: {
        hook: '@',
        icon: '@'
      },
      template: `<i class="{{icon}} icon"></i><div data-tab="{{hook}}"><ng-transclude></ng-transclude></div>`,
      transclude: true,
      link: function postLink(scope, element, attrs) {
        $(element).tab();
      }
    };
  });
