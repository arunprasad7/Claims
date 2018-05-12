(function() {
    'use strict';
    angular
        .module('claims')
        .directive('mySearchBox', function() {
            return {
            restrict: 'E',
            link: function(scope, element, attrs) {
                element.css({'width':'100%'});
            },
            scope: {
                searchText: '=',
                isSearching: '=',
                searchInfo: '=',
                dropDown:'=',
                searchAuto:'=',
                callback: '&'
            },
            controller: function($scope ) {
                $scope.autoSearch = $scope.searchAuto;
                $scope.paymentWay= "";
                $scope.search = {};
                $scope.clearSearch = function() {
                    $scope.searchText = "";
                    $scope.localSearchText = "";
                    $scope.search = {};
                };
                $scope.doSearch = function() {
                    var searchText = $scope.search;
                    $scope.callback({'data' : searchText});
                };
                $scope.querySearch = function(query) {
                    return query ? $scope.autoSearch.filter(createFilterFor(query)) : $scope.autoSearch;
                }
                function createFilterFor(query) {
                    var lowercaseQuery = angular.lowercase(query);
                    return function filterFn(state) {
                        return (((angular.lowercase(state.name).indexOf(lowercaseQuery) != 0) && angular.lowercase(state.name).indexOf(lowercaseQuery) != -1) || (angular.lowercase(state.name).indexOf(lowercaseQuery) === 0));
                    };
                }
            },
            replace: true,
            template:
            '<form>' +
                 '<div class="leftContainerSample">'+
                    '<div class="searchBarSample">'+
                        '<div class="searchBarRowSample">'+
                            "<md-grid-list md-cols='{{searchInfo.length+1}}' md-gutter='0px' md-row-height='60px'style='width:100%;'>"+
                                "<md-grid-tile  ng-repeat='x in searchInfo'style='border-left: 1px solid #e6e6e6;width: 194% !important;'>"+
                                        "<md-input-container flex-gt-sm ng-if=\"x.type == 'text'\"'>"+
                                                '<label>{{x.label}}</label>'+
                                                "<input ng-model='search[x.name]'>" +
                                        '</md-input-container>'+
                                        "<md-input-container flex-gt-sm ng-if=\"x.type == 'dropDown'\">"+
                                                '<label>{{x.label}}</label>'+
                                                "<md-select ng-model='search[x.name]'>"+
                                                    "<md-option  ng-repeat='s in dropDown' value='{{s.text}}'>{{s.text}}</md-option>"+
                                                "</md-select>"+
                                        '</md-input-container>'+
                                        "<md-input-container  ng-if=\"x.type == 'date'\">"+
                                                '<label>{{x.label}}</label>'+
                                                '<md-datepicker class="icon" ng-keyup="clearDatepickerKeyupValue($event)" ng-model="search[x.name]" md-hide-icons="triangle" md-open-on-focus></md-datepicker>'+
                                        '</md-input-container>'+
                                        "<div flex-gt-sm ng-if=\"x.type == 'autoSearch'\"style='margin-top: -10px;'>"+
                                            "<md-icon style='margin-top: 46px; padding-left:5px;'>"+
                                                    "<i class='oi align-middle' data-glyph='magnifying-glass'></i>"+
                                            '</md-icon>'+
                                            '<md-autocomplete flex-gt-sm style="width:80%; top: 0; left: 7px; bottom: 0; right: 0; position: absolute; margin-left: 15px; float: left; margin-top:10px;"'+
                                                "md-selected-item='search[x.name]'"+
                                                "md-search-text='approvedSearchText'"+
                                                "md-items='item in querySearch(approvedSearchText)'"+
                                                "md-item-text='item.name'"+
                                                "md-floating-label='{{x.label}}'"+
                                                "md-clear-button='true'"+
                                                '<md-item-template>'+
                                                    "<span md-highlight-text='approvedSearchText'>{{item.name}}</span>"+
                                                '</md-item-template>'+
                                                '<md-not-found>'+
                                                    'No Result Found'+
                                                '</md-not-found>'+
                                            '</md-autocomplete>'+
                                        '</div>'+
                                    "</md-grid-tile>"+
                                    "<md-grid-tile style='border-left: 1px solid #e6e6e6;width: 194% !important;'>"+
                                        '<button ng-click="doSearch()"    class="searBtn searBtnWithText mt-3 ml-3 mr-3 align-middle">Search</button>' +
                                        '<button ng-click="clearSearch()" class="searBtn searBtnWithText mt-3 ml-3 mr-3 align-middle">Clear</button>' +
                                "</md-grid-tile>"+
                            "</md-grid-list>"+
                         '</div>'+
                    '</div>'+
                '</div>'+
            '</form>'
            };
        })
})();


