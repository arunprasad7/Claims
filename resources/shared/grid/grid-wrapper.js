(function() {
    'use strict';

    angular
        .module('claims')
        .directive('gridWrapper', function(ReimbursementProcessingService, EclaimService) {
            return {
                restict: 'AEC',
                scope: {
                    uiGridOptions :'=',
                    inlineEdit : '=',
                    module : '=',
                    onGridAction: '&'
                },
                link: function(scope, elem, attrs, ngModel) {
                    scope.currencyType = '1';
                    scope.baseCurrencyType = '2';
                    scope.noRecordsAvailable = scope.uiGridOptions['data'].length == 0;
                    scope.currencyFields = scope.uiGridOptions.columnDefs.filter(function(value) {
                        if(value.convertCurrency) {
                            return value;
                        }
                    }).map(function(item) {
                        return item.name;
                    });

                    var templates = {};
                    templates.staticTemplate = '<a href="javascript:;" class="custCheckboxBtn" ng-class="{\'custCheckboxBtnSected\' : row.entity.isChecked}" ng-click="row.entity.isChecked = !row.entity.isChecked"><span class="oi" data-glyph="check"></span></a>';

                    templates.settingsTemplate = '<a href="javascript:;" class="eclaimReqSetBtn dropdown-toggle" style="padding:10px 10px 10px 10px;" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><span class="oi" data-glyph="wrench"></span></a>&nbsp;'+
                    '<a class="eclaimReqSetBtn" href="javascript:;" ng-click="grid.appScope.gridAction(\'edit\', row.entity, rowRenderIndex)" ng-if="!grid.appScope.inlineEdit"><span class="oi mr-1" data-glyph="pencil"></span></a>'+
                    '<div class="dropdown-menu eclaimReqSetOption"><a class="dropdown-item" href="javascript:;" ng-click="grid.appScope.gridAction(\'approve\', row.entity, rowRenderIndex)"><span class="oi mr-1" data-glyph="thumb-up"></span> Approve</a>'+
                    '<a class="dropdown-item" href="javascript:;" ng-click="grid.appScope.gridAction(\'reject\' ,row.entity, rowRenderIndex)"><span class="oi mr-1" data-glyph="thumb-down"></span> Reject</a>'+
                    '<a class="dropdown-item" href="javascript:;"><span class="oi mr-1" data-glyph="check"></span> Validate</a><a class="dropdown-item" href="javascript:;" ng-click="grid.appScope.gridAction(\'delete\' ,row.entity, rowRenderIndex)"><span class="oi mr-1" data-glyph="delete"></span> Delete</a><div class="dropdown-divider"></div>'+
                    '<a class="dropdown-item" href="javascript:;">Reinsurance</a><a class="dropdown-item" href="javascript:;">History</a><a class="dropdown-item" href="javascript:;">Policy Rules</a></div>';

                    templates.dateTemplate = '<div ng-if="!row.entity.editable || !col.colDef.enableCellEdit" style="padding:3px;">{{COL_FIELD | date:\'mediumDate\'}}</div><div ng-if="row.entity.editable && col.colDef.enableCellEdit" class="p1px">'+
                    '<md-datepicker class="md-block" md-hide-icons="all" md-open-on-focus aria-label="{{row.entity.name}}" name="{{col.name}}" id="{{row.uid}}-{{col.name}}-edit-cell" ng-model="MODEL_COL_FIELD"></md-datepicker></div>';

                    templates.descriptionTemplate = '<div ng-if="!row.entity.editable || !col.colDef.enableCellEdit" class="text-truncate" style="padding:3px;" ng-click="grid.appScope.gridAction(\'edit\', row.entity, rowRenderIndex)">{{COL_FIELD}}</div>';

                    templates.textTemplate = '<div ng-if="!row.entity.editable || !col.colDef.enableCellEdit" style="padding:3px;">{{COL_FIELD}}</div><div ng-if="row.entity.editable && col.colDef.enableCellEdit" class="p1px">'+
                            '<md-input-container class="md-block"> <input type="text" ng-model="MODEL_COL_FIELD" aria-label="{{row.entity.name}}" name="{{col.name}}" id="{{row.uid}}-{{col.name}}-edit-cell" ui-grid-editor/></md-input-container></div>';

                    templates.numTemplate = '<div ng-if="!row.entity.editable || !col.colDef.enableCellEdit" style="padding:3px;">{{COL_FIELD}}</div><div ng-if="row.entity.editable && col.colDef.enableCellEdit" class="p1px">'+
                    '<md-input-container class="md-block"> <input type="number" ng-model="MODEL_COL_FIELD" aria-label="{{row.entity.name}}" name="{{col.name}}" id="{{row.uid}}-{{col.name}}-edit-cell" ui-grid-editor/></md-input-container></div>';                            

                    scope.gridOptions = scope.uiGridOptions;
                    angular.forEach(scope.gridOptions.columnDefs, function(value, key) {
                        if(value.hasOwnProperty("cellTemplate")) value.cellTemplate = templates[value.cellTemplate];
                    });

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
                            $($('.ui-grid-render-container-body').children()).addClass('ui-grid-content');
                        });
                    }

                    scope.toggleSelect = function() {
                        scope.isChecked = !scope.isChecked;
                        angular.forEach(scope.gridOptions.data, function(value,key) {
                            value.isChecked = scope.isChecked;
                        })
                    }

                    scope.convertCurrency = function() {
                        angular.forEach(scope.gridOptions.data, function(value, key) {
                            scope.currencyFields.forEach(function(item) {
                                value[item] = value[item] ? (value[item] * parseInt(scope.currencyType)) : null;
                            });
                        });
                    }

                    scope.gridAction = function(actionType, record, rowIndex) {
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
                },
                templateUrl: 'resources/shared/grid/grid-wrapper.html'   
            }    
        });
})();