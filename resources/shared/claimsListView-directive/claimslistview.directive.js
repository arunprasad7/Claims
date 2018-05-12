(function() {
    'use strict';

    angular
        .module("claims")
            .directive("claimsListView", function($rootScope, $filter) {
                return {
                    restrict: 'E',
                    templateUrl: 'resources/shared/claimsListView-directive/claimslistview.directive.html',
                    scope: {
                        tabsToDisplay: '<',
                        allClaimRecords: '=',
                        selectedClaims: '=',
                        navigateTo: '@',
                        rerenderView: '=',
                        searchBy: '='
                    },
                    link: function(scope, element, attrs) {
                        
                        scope.selectAll = false;
                        scope.sortBy = 'receivedDateDesc';
                        scope.orderByField = 'requestRecievedOn';
                        scope.reverseSort = false;
                        scope.selectedClaims = [];
                        scope.countByStatus = {};
                        scope.filteredClaims = [];

                        function init() {
                            scope.currentTab = scope.tabsToDisplay ? scope.tabsToDisplay[0].tab : 'newRequest';
                            scope.currentTabIndex = 0;
                            setTabsCount(scope.currentTabIndex);
                            scope.claimsRecords = angular.copy($filter('filter')(scope.allClaimRecords, {status: scope.filterByStatus}));
                        }

                        function setTabsCount(statusIndex) {
                            angular.forEach(scope.tabsToDisplay, (statusRecord, index) => {
                                if (statusIndex == index) {
                                    scope.filterByStatus = statusRecord.state;
                                }
                                scope.countByStatus[statusRecord.state] = angular.copy($filter('filter')(scope.allClaimRecords, { status: statusRecord.state }).length);
                            });
                        }

                        scope.changeTab = function(tabName, tabIndex) {
                            scope.selectAll = false;
                            scope.currentTabIndex = tabIndex;
                            scope.currentTab = tabName;
                            switch(tabName) {
                                case 'Approved':
                                    scope.filterByStatus = 'Approved';
                                    scope.claimsRecords = angular.copy($filter('filter')(scope.allClaimRecords, {status: 'Approved'}));
                                break;
                                case 'InProgress':
                                    scope.filterByStatus = 'InProgress';
                                    scope.claimsRecords = angular.copy($filter('filter')(scope.allClaimRecords, {status: 'InProgress'}));
                                break;
                                case 'Rejected':
                                    scope.filterByStatus = 'Rejected';
                                    scope.claimsRecords = angular.copy($filter('filter')(scope.allClaimRecords, {status: 'Rejected'}));
                                break;
                                case 'Waitingforapproval':
                                    scope.filterByStatus = 'Waitingforapproval';
                                    scope.claimsRecords = angular.copy($filter('filter')(scope.allClaimRecords, {status: 'Waitingforapproval'}));
                                break;
                                case 'Assigned':
                                    scope.filterByStatus = 'Assigned';
                                    scope.claimsRecords = angular.copy($filter('filter')(scope.allClaimRecords, {status: 'Assigned'}));
                                break;
                                case 'newRequest':
                                    scope.filterByStatus = 'New Request';
                                    scope.claimsRecords = angular.copy($filter('filter')(scope.allClaimRecords, {status: 'New Request'}));
                                break;
                                default:
                                    console.log('no tabs available...');
                            }
                        }

                        scope.selectAllClaims = function() {
                            scope.selectAll = !scope.selectAll;
                            scope.filteredClaims.forEach((claim) => {
                                if (claim['status'] == scope.filterByStatus) {
                                    claim['selected'] = scope.selectAll;
                                    if (scope.selectAll) {
                                        scope.selectedClaims.push(claim);
                                    }
                                }
                            });
                            if (!scope.selectAll) {
                                scope.selectedClaims = [];
                            }
                        }

                        scope.claimsToSelect = function(claimRecord) {
                            if (claimRecord['selected']) {
                                scope.selectedClaims.push(claimRecord);
                            } else {
                                var claimIndex = scope.selectedClaims.indexOf(claimRecord);
                                if (claimIndex != -1) {
                                    scope.selectedClaims.splice(claimIndex, 1);
                                }
                            }
                        }

                        scope.sortByValue = function() {
                            scope.reverseSort = (scope.sortBy == 'receivedDateDesc') ? false : true;
                        }

                        scope.redirectTo = function(stateName) {
                            $rootScope.navigateTo(stateName);
                        }

                        scope.$watch('rerenderView', (newValue, oldValue, scope) => {
                            scope.changeTab(scope.currentTab, scope.currentTabIndex);
                            setTabsCount(scope.currentTabIndex);
                        });

                        scope.$watch('filteredClaims', (newValue, oldValue, scope) => {
                            scope.selectAll = false;
                        });

                        scope.$watch('searchBy', (newValue, oldValue, scope) => {
                            if (newValue != null) {
                                var claimsFilteredBySearch = $filter('filter')(scope.allClaimRecords, newValue);
                                scope.claimsRecords = angular.copy($filter('filter')(claimsFilteredBySearch, {status: scope.filterByStatus}));
                                scope.countByStatus[scope.filterByStatus] = angular.copy($filter('filter')(scope.claimsRecords, { status: statusRecord.state }).length);
                            }
                        });

                        init();
                    }
                }
            }
        );
})()