(function() {
    'use strict';

    angular
        .module('claims')
        .directive('gridWrapper', function(ReimbursementProcessingService, EclaimService) {
            return {
                restict: 'AEC',
                templateUrl: 'resources/shared/grid/view/grid-wrapper.html',
                scope: {
                    uiGridOptions :'=',
                    inlineEdit : '=',
                    module : '=',
                    onGridAction: '&'
                },
                link: function(scope, elem, attrs, ngModel) {
                    scope.currencyType = '1';
                    scope.noRecordsAvailable = scope.uiGridOptions['data'].length == 0;
                    scope.currencyFields = scope.uiGridOptions.columnDefs.filter(function(value) {
                        if(value.convertCurrency) {
                            return value;
                        }
                    }).map(function(item) {
                        return item.name;
                    });
                    var path = 'resources/shared/grid/view/';
                    scope.gridOptions = scope.uiGridOptions;
                    angular.forEach(scope.gridOptions.columnDefs, function(value, key) {
                        if(value.hasOwnProperty("cellTemplate")) value.cellTemplate = path + value.cellTemplate;
                        if(value.hasOwnProperty("headerCellTemplate")) value.headerCellTemplate = path + value.headerCellTemplate;
                    });

                    scope.noRecordsAvailable = scope.gridOptions['data'].length == 0;

                    scope.gridOptions.onRegisterApi = function(gridApi) {
                        if(scope.inlineEdit) {
                            gridApi.edit.on.beginCellEdit(null, function(row, colDef, event) {
                                row.entity.editable = !row.entity.editable;
                                row.entity.editedColName = colDef.name;
                                if(scope.prevEdittedRow && scope.prevEdittedRow.uid != row.uid) {
                                    scope.prevEdittedRow.entity.editable = false;
                                }
                                scope.prevEdittedRow = row;
                                scope.prevRowobj = angular.copy(row.entity);
                            })
                        }

                        gridApi.core.on.rowsRendered(scope, function(resp) {
                            if(scope.action == 'new') {
                                scope.prevEdittedRow = resp.grid.rows[scope.gridOptions.data.length-1];
                                scope.prevRowobj = angular.copy(scope.prevEdittedRow.entity);
                            }
                            $($('.ui-grid-render-container-body').children()).addClass('ui-grid-content');
                        });
                    }

                    scope.toggleSelect = function() {
                        scope.isChecked = !scope.isChecked;
                        angular.forEach(scope.gridOptions.data, function(value, key) {
                            value.isChecked = scope.isChecked;
                        })
                    }

                    scope.convertCurrency = function() {
                        angular.forEach(scope.gridOptions.data, function(value, key) {
                            scope.currencyFields.forEach(function(item) {
                                value[item] = value[item] ? (value[item] * parseInt(scope.currencyType)) : null;
                            });
                        });
                        var info = {action : 'convertCurrency'}
                        scope.onGridAction({info})
                    }

                    scope.gridAction = function(actionType, record, rowIndex) {
                        scope.action = actionType;
                        var info = {action : actionType, data : record, index : rowIndex};
                        scope.onGridAction({info});
                    }                    

                    $('#right-button').click(function() {
                        event.preventDefault();
                        $('.ui-grid-content').animate({
                        scrollLeft: "+=322px"
                        }, "slow");
                    });
                    
                    $('#left-button').click(function() {
                        event.preventDefault();
                        $('.ui-grid-content').animate({
                            scrollLeft: "-=322px"
                        }, "slow");
                    });

                    scope.$watch('gridOptions.data.length', function(newValue, oldValue) {
                        if(newValue != null) scope.noRecordsAvailable = (newValue == 0);
                    })
                }
            }    
        });
})();