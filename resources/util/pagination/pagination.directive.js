(function() {
    'use strict';

    angular
        .module("claims")
            .directive("pagination", function($rootScope, PaginationFactory) {
                return {
                    restrict: 'E',
                    templateUrl: 'resources/util/pagination/pagination.html',
                    scope: {
                        recordsToDisplay: '=',
                        records: '=',
                        totalRecordCount: '=',
                        filteredClaims: '='
                    },
                    link: function(scope, element, attrs) {
                        scope.pager = {};

                        function init() {
                            scope.setPage(1);
                        }

                        scope.setPage = function(page) {
                            if (page < 1 || page > scope.pager.totalPages) {
                                return;
                            }
                            scope.pager = PaginationFactory.getPageSettings(scope.records.length, page, scope.recordsToDisplay);
                            scope.items = scope.records.slice(scope.pager.startIndex, scope.pager.endIndex + 1);
                            scope.filteredClaims = angular.copy(scope.items);
                        }

                        scope.$watch('records', function(newValue, oldValue, scope) {
                            scope.setPage(1);
                        })

                        init();
                    }
                }
            }
        )
        .factory("PaginationFactory", function() {
            var service = {};
            service.getPageSettings = getPageSettings;
            return service;
    
            function getPageSettings(totalItems, currentPage, pageSize) {
                currentPage = currentPage || 1;
                pageSize = pageSize || 10;
                var totalPages = Math.ceil(totalItems / pageSize);

                var startPage, endPage;
                if (totalPages <= 10) {
                    startPage = 1;
                    endPage = totalPages;
                } else {
                    if (currentPage <= 6) {
                        startPage = 1;
                        endPage = 10;
                    } else if (currentPage + 4 >= totalPages) {
                        startPage = totalPages - 9;
                        endPage = totalPages;
                    } else {
                        startPage = currentPage - 5;
                        endPage = currentPage + 4;
                    }
                }

                var startIndex = (currentPage - 1) * pageSize;
                var endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);
                var pages = _.range(startPage, endPage + 1);

                return {
                    totalItems: totalItems,
                    currentPage: currentPage,
                    pageSize: pageSize,
                    totalPages: totalPages,
                    startPage: startPage,
                    endPage: endPage,
                    startIndex: startIndex,
                    endIndex: endIndex,
                    pages: pages
                };
            }
        }
    );
})()