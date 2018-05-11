// var claims = angular.module("claims", []);
//     claims.directive('student', function() {
//         var directive = {};
//         directive.restrict = 'E';
//         directive.template = "Student: <b>{{student.name}}</b> , Roll No: <b>{{student.rollno}}</b>";
//         directive.scope = {
//             student : "=name"
//         }
//         directive.compile = function(element, attributes) {
//             element.css("border", "1px solid #cccccc");
            
//             var linkFunction = function($scope, element, attributes) {
//                 element.html("Student: <b>"+$scope.student.name +"</b> , Roll No: <b>"+$scope.student.rollno+"</b><br/>");
//                 element.css("background-color", "#ff00ff");
//             }
//             return linkFunction;
//         }
//         return directive;
//     });

// (function() {
//     'use strict';
//     angular
//         .module('claims')
//         .directive('myCustomer', function() {
//             return {
//                 template: 'Name: {{customer.name}} Address: {{customer.address}}'
//             }
//         });    
// })();

// (function() {
//     'use strict';
//     angular
//         .module('claims')
//         .directive('search', function() {
//             var directive = {};
//             directive.restrict = 'E';
//             //directive.template = "Cliam NO: <b>{{search.name}}</b> , Roll No: <b>{{search.rollno}}</b>";
//             directive.scope = {
//                 search : "=name"
//             }
//             directive.compile = function(element, attributes) {
//                 element.css("border", "4px solid #cccccc");
                
//                 var linkFunction = function($scope, element, attributes) {
//                    // element.html("Cliam No: <b>"+$scope.search.name +"</b> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Status: <b>"+$scope.search.rollno+"</b><br/>");
//                    element.html("Cliam No: <b>"+$scope.search.name +"</b> ::: Status: <b>"+$scope.search.rollno+"</b><br/>");
//                    element.css("background-color", "#D5DBDB");
//                 }
//                 return linkFunction;
//             }
//             return directive;
//         });   
// })();


// (function() {
//     'use strict';
//     angular
//         .module('claims')
//         .directive('dropdown', function($timeout){
//             return {
//                 restrict: 'A',
//                 require: 'ngModel',
//                 scope: {
//                     list: '=dropdown',
//                     ngModel: '='
//                 },
//                 template: '<div class="dropdown" ng-click="open=!open" ng-class="{open:open}"><div ng-repeat="thing in list" style="top: {{($index + 1) * height}}px; -webkit-transition-delay: {{(list.length - $index) * 0.03}}s; z-index: {{list.length - $index}}" ng-hide="!open" ng-click="update(thing)" ng-class="{selected:selected===thing.text}"><span>{{thing.text}}</span></div><span class="title" style="top: 0px; z-index: {{list.length + 1}}"><span>{{selected}}</span></span><span class="clickscreen" ng-hide="!open">&nbsp;</span></div>',
//                 replace: true,
//                     link: function(scope, elem, attrs, ngModel) {
//                         scope.height = elem[0].offsetHeight;
//                         scope.$watch('ngModel',function(){
//                         scope.selected = ngModel.$modelValue;  
//                     });
//                     scope.update = function(thing) {
//                         ngModel.$setViewValue(thing.text);
//                         ngModel.$render(); 
//                     };
//                 }
//             };
//         });  
// })();

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
                            "<md-grid-list md-cols='{{searchInfo.length+1}}' md-gutter='0px' md-row-height='70px'style='width:100%'>"+
                                "<md-grid-tile  ng-repeat='x in searchInfo'>"+
                                        "<md-input-container flex-gt-sm ng-if=\"x.type == 'text'\">"+
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
                                                '<md-datepicker ng-keyup="clearDatepickerKeyupValue($event);" ng-model="search[x.name]" md-hide-icons="triangle" md-open-on-focus></md-datepicker>'+
                                        '</md-input-container>'+
                                        "<div flex-gt-sm ng-if=\"x.type == 'autoSearch'\">"+
                                            "<md-icon style='margin-top: 36px; padding-left:5px;'>"+
                                                    "<i class='oi align-middle' data-glyph='magnifying-glass'></i>"+
                                            '</md-icon>'+
                                            '<md-autocomplete flex-gt-sm style="width:80%; top: 0; left: 7px; bottom: 0; right: 0; position: absolute; margin-left: 15px; float: left;"'+
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
                                    "<md-grid-tile >"+
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


