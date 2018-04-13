(function() {
    'use strict';

    angular
        .module('claims')
        .controller('EclaimController', EclaimController)

    EclaimController.$inject = ['$scope', '$rootScope', 'EclaimService'];

    function EclaimController($scope, $rootScope, EclaimService) {
        $scope.claimReqList = EclaimService.getClaimsRequest();
        $scope.getWidth = function() {
            if($scope.infoToggle) {
                return (window.innerWidth - 380) + 'px';
            }
            return (window.innerWidth - 100) + 'px';
        }
        var textTemplate = '<div ng-if="!row.entity.editable || !col.colDef.enableCellEdit" style="padding:3px;">{{COL_FIELD}}</div><div ng-if="row.entity.editable && col.colDef.enableCellEdit">'+
                            '<md-input-container class="md-block"> <input type="text" ng-model="MODEL_COL_FIELD" name="{{col.name}}" id="{{row.uid}}-{{col.name}}-edit-cell" ui-grid-editor/></md-input-container></div>';
        
        var numTemplate = '<div ng-if="!row.entity.editable || !col.colDef.enableCellEdit" style="padding:3px;">{{COL_FIELD}}</div><div ng-if="row.entity.editable && col.colDef.enableCellEdit">'+
                           '<md-input-container class="md-block"> <input type="number" ng-model="MODEL_COL_FIELD" name="{{col.name}}" id="{{row.uid}}-{{col.name}}-edit-cell" ui-grid-editor/></md-input-container></div>';
        var dateTemplate = '<div ng-if="!row.entity.editable || !col.colDef.enableCellEdit" style="padding:3px;">{{COL_FIELD | date:\'mediumDate\'}}</div><div ng-if="row.entity.editable && col.colDef.enableCellEdit">'+
                           '<md-datepicker class="md-block" md-open-on-focus ng-model="MODEL_COL_FIELD" name="{{col.name}}" id="{{row.uid}}-{{col.name}}-edit-cell" ui-grid-editor></md-datepicker></div>';        
        
        var staticTemplate = '<a href="javascript:;" class="custCheckboxBtn" ng-class="{\'custCheckboxBtnSected\' : row.entity.isSelected}" ng-click="row.entity.isSelected = !row.entity.isSelected"><span class="oi" data-glyph="check"></span></a>&nbsp;'+
                     '<a href="javascript:;" class="eclaimReqSetBtn dropdown-toggle" ng-click="row.entity.showDropdown = !row.entity.showDropdown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><span class="oi" data-glyph="wrench"></span></a>'+
                     '<div class="cstmDropdown-menu eclaimReqSetOption" ng-class="{\'show\' : row.entity.showDropdown}">'+
                     '<a class="dropdown-item" href="#"><span class="oi mr-1" data-glyph="thumb-up"></span> Approve</a>'+
                     '<a class="dropdown-item" href="#"><span class="oi mr-1" data-glyph="thumb-down"></span> Reject</a>'+
                     '<a class="dropdown-item" href="#"><span class="oi mr-1" data-glyph="reload"></span> Undo</a>'+
                     '<a class="dropdown-item" href="#"><span class="oi mr-1" data-glyph="check"></span> Validate</a><div class="dropdown-divider"></div>'+
                     '<a class="dropdown-item" href="#">Reinsurance</a><a class="dropdown-item" href="#">History</a><a class="dropdown-item" href="#">Policy Rules</a></div>'
                     

        $scope.gridOptions = {
            data : EclaimService.getEclaimList(),
            columnDefs: [
                {name:'action', displayName:'', cellTemplate:staticTemplate,width:80, pinnedLeft:true, enableCellEdit:false},
                {name:'serviceType', displayName:'Service Type', cellTemplate:textTemplate,width:100},
                {name:'serviceCode', displayName:'Service code', cellTemplate:textTemplate,width:120},
                {name:'serviceFrmDate', displayName:'Service From', cellTemplate:dateTemplate,width:130, enableCellEdit:false},
                {name:'days', displayName:'Days', cellTemplate:numTemplate,width:60},
                {name:'quantity', displayName:'QTY', cellTemplate:numTemplate,width:60},
                {name:'treatmentCode', displayName:'Treatment Code', cellTemplate:textTemplate,width:140},
                {name:'dhaPrice', displayName:'HAAD/DHA Price', cellTemplate:numTemplate,width:125},
                {name:'price', displayName:'Price', cellTemplate:numTemplate,width:125},
                {name:'reqAmount', displayName:'Requested Amount', cellTemplate:numTemplate,width:140},
                {name:'dedAmount', displayName:'Ded Amount', cellTemplate:numTemplate,width:125},
                {name:'approvedAmt', displayName:'Approved Amount', cellTemplate:numTemplate,width:140},
                {name:'rejectedAmt', displayName:'Rejected Amount   ', cellTemplate:numTemplate,width:140},
                {name:'rejectedCode', displayName:'Rejected Code', cellTemplate:textTemplate,width:130},
                {name:'shortfallAmount', displayName:'Shortfall Amount', cellTemplate:numTemplate,width:135},
                {name:'status', displayName:'Status', cellTemplate:textTemplate,width:145},
                {name:'remarks', displayName:'Internal Remarks', cellTemplate:textTemplate,width:162},
            ]
        }
        
        $scope.gridOptions.onRegisterApi = function(gridApi) {
            gridApi.edit.on.beginCellEdit(null, function(row, colDef, event) {
                row.entity.editable = !row.entity.editable;
                row.entity.editedColName = colDef.name;
                $scope.action = 'edit';
                if($scope.prevEdittedRow && $scope.prevEdittedRow.uid != row.uid) {
                    $scope.prevEdittedRow.entity.editable = false;
                }
                $scope.prevEdittedRow = row;
                $scope.prevRowobj = angular.copy(row.entity);
            })

            gridApi.core.on.rowsRendered( $scope, function(resp) {
                $($('.ui-grid-render-container-body').children()[1]).addClass('ui-grid-content');
                if($scope.action == 'new') {
                    $scope.prevEdittedRow = resp.grid.rows[$scope.gridOptions.data.length-1];
                    $scope.prevRowobj = angular.copy($scope.prevEdittedRow.entity);
                }
            });
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
    }
})();