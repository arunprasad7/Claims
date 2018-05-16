(function() {
    'use strict';

    angular
        .module("claims")
            .directive("listView", function($rootScope, $filter, ListViewService) {
                return {
                    restrict: 'E',
                    templateUrl: 'resources/directives/listView-directive/view/listview.directive.html',
                    scope: {
                        headers: '<',
                        records: '=',
                        redirectTo: '@',
                        searchBy: '='
                    },
                    link: function(scope, element, attrs) {
                        
                        scope.filteredRecords = [];
                        scope.reverse = false;

                        scope.sortBy = function(fieldName) {
                            scope.reverse = (scope.fieldName === fieldName) ? !scope.reverse : false;
                            scope.fieldName = fieldName;
                        }
                
                        scope.navigateTo = function(requestData) {
                            ListViewService.setRequestData(requestData);
                            $rootScope.navigateTo(scope.redirectTo);
                        }
                
                        scope.getSelectedData = function(selectedRecord) {
                            scope.selectedUser = selectedRecord;
                        }
                    
                        scope.$watch('searchBy', (newValue, oldValue, scope) => {
                            if (newValue != null) {
                                scope.records = $filter('filter')(scope.allRecords, newValue);
                            }
                        });

                        function init() {
                            scope.allRecords = angular.copy(scope.records);
                        }

                        init();

                    }
                }
            }
        );
})()