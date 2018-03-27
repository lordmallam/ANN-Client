"use strict";

angular.module('annClientApp')
    .directive('imageUpload', function () {
        return {
            restrict: 'E',
            scope: {
                ngModel: '=',
                src: '=',
                imageHeight: '@',
                mode: '@',
                base64: '='
            },
            link: function (scope, elem) {
              var reader = new FileReader();
              var file = angular.element(elem[0].querySelector('#file'));
              if (scope.src === null || angular.isUndefined(scope.src) || scope.src === '') {
                scope.src = "url('components/media/default-image-md.png')";
              }
                scope.showFile = function () {
                    file.click();
                };

                scope.loadImage = function () {                    
                    var input = file;                    
                    if (input[0].files && input[0].files[0]) {                          
                        reader.readAsDataURL(input[0].files[0]);
                        reader.onload = function (e) {
                            scope.ngModel = input[0].files[0];
                            scope.src = "url(" + e.target.result + ")";
                            scope.base64 = reader.result;
                            scope.$apply();
                        };
                    }
                };
            },
            templateUrl: 'components/media/image-upload.html'
        };
    });
