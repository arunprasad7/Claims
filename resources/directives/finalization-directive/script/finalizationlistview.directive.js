(function() {
    'use strict';

    angular
        .module("claims")
            .directive("finalizationListView", function($rootScope, $filter) {
                return {
                    restrict: 'E',
                    templateUrl: 'resources/directives/finalization-directive/view/finalizationlistview.directive.html',
                    scope: {
                        finalizationRecords: '=',
                        redirectTo: '@',
                        finalizeSelectedClaims: '&',
                        selectedClaims: '=',
                        rerenderView: '=',
                        searchBy: '='
                    },
                    link: function(scope, element, attrs) {

                        scope.selectAll = false;
                        scope.sortBy = 'receivedDateDesc';
                        scope.orderByField = 'receivedDate';
                        scope.reverseSort = false;
                        scope.selectedClaims = [];
                        scope.filteredClaims = [];

                        function init() {
                            console.log('finalization list view');
                            scope.allFinalizationRecords = angular.copy(scope.finalizationRecords);
                        }

                        scope.selectAllRecords = function() {
                            scope.selectAll = !scope.selectAll;
                            scope.filteredClaims.forEach((claim) => {
                                claim['selected'] = scope.selectAll;
                                if (scope.selectAll) {
                                    scope.selectedClaims.push(claim);
                                }
                            });
                            if (!scope.selectAll) {
                                scope.selectedClaims = [];
                            }
                        }

                        scope.selectClaimToFinalize = function(claimRecord) {
                            if (claimRecord['selected']) {
                                scope.selectedClaims.push(claimRecord);
                            } else {
                                var claimIndex = scope.selectedClaims.indexOf(claimRecord);
                                if (claimIndex != -1) {
                                    scope.selectedClaims.splice(claimIndex, 1);
                                }
                            }
                        }

                        scope.sortByValue = function(sortTo) {
                            scope.reverseSort = (sortTo == 'receivedDateDesc') ? false : true;
                        }

                        scope.$watch('rerenderView', (newValue, oldValue, scope) => {
                            scope.selectAll = false;
                            scope.finalizationRecords = angular.copy($filter('orderBy')(scope.finalizationRecords, 'receivedDate', false));
                        });

                        scope.$watch('searchBy', (newValue, oldValue, scope) => {
                            scope.finalizationRecords = $filter('filter')(scope.allFinalizationRecords, newValue);
                        });

                        scope.$watch('filteredClaims', (newValue, oldValue, scope) => {
                            scope.selectAll = false;
                        });

                        init();
                    }
                }
            }
        );
})()