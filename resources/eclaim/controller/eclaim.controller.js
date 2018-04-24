(function() {
    'use strict';

    angular
        .module('claims')
        .controller('EclaimController', EclaimController)

    EclaimController.$inject = ['$scope', '$rootScope', 'EclaimService', 'ngNotify'];

    function EclaimController($scope, $rootScope, EclaimService, ngNotify) {
        $scope.claimReqList = EclaimService.getClaimsRequest();
        $scope.claim = $scope.claimReqList[0];
        
        $scope.getWidth = function() {  
            if($scope.infoToggle) {
                return (window.innerWidth - 380) + 'px';
            }
            return (window.innerWidth - 100) + 'px';
        }

        var textTemplate = '<div ng-if="!row.entity.editable || !col.colDef.enableCellEdit" style="padding:3px;">{{COL_FIELD}}</div><div ng-if="row.entity.editable && col.colDef.enableCellEdit" class="p1px">'+
                            '<md-input-container class="md-block"> <input type="text" ng-model="MODEL_COL_FIELD" aria-label="{{row.entity.name}}" name="{{col.name}}" id="{{row.uid}}-{{col.name}}-edit-cell" ui-grid-editor/></md-input-container></div>';
        
        var numTemplate = '<div ng-if="!row.entity.editable || !col.colDef.enableCellEdit" style="padding:3px;">{{COL_FIELD}}</div><div ng-if="row.entity.editable && col.colDef.enableCellEdit" class="p1px">'+
                           '<md-input-container class="md-block"> <input type="number" ng-model="MODEL_COL_FIELD" aria-label="{{row.entity.name}}" name="{{col.name}}" id="{{row.uid}}-{{col.name}}-edit-cell" ui-grid-editor/></md-input-container></div>';
        var dateTemplate = '<div ng-if="!row.entity.editable || !col.colDef.enableCellEdit" style="padding:3px;">{{COL_FIELD | date:\'mediumDate\'}}</div><div ng-if="row.entity.editable && col.colDef.enableCellEdit" class="p1px">'+
                           '<md-datepicker class="md-block" md-hide-icons="all" md-open-on-focus aria-label="{{row.entity.name}}" name="{{col.name}}" id="{{row.uid}}-{{col.name}}-edit-cell" ng-model="MODEL_COL_FIELD"></md-datepicker></div>';
        
        var staticTemplate = '<a href="javascript:;" class="custCheckboxBtn" ng-class="{\'custCheckboxBtnSected\' : row.entity.isChecked}" ng-click="row.entity.isChecked = !row.entity.isChecked"><span class="oi" data-glyph="check"></span></a>&nbsp;';
        
        var settingsTemplate = '<a href="javascript:;" class="eclaimReqSetBtn dropdown-toggle"" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><span class="oi" data-glyph="wrench"></span></a>'+
        '<div class="dropdown-menu eclaimReqSetOption"><a class="dropdown-item" href="javascript:;" ng-click="grid.appScope.approveClaim()"><span class="oi mr-1" data-glyph="thumb-up"></span> Approve</a>'+
        '<a class="dropdown-item" href="javascript:;" ng-click="grid.appScope.rejectClaim()"><span class="oi mr-1" data-glyph="thumb-down"></span> Reject</a><a class="dropdown-item" href="javascript:;"><span class="oi mr-1" data-glyph="reload"></span> Undo</a>'+
        '<a class="dropdown-item" href="javascript:;"><span class="oi mr-1" data-glyph="check"></span> Validate</a><a class="dropdown-item" href="javascript:;" ng-click="grid.appScope.deleteRow(rowRenderIndex)"><span class="oi mr-1" data-glyph="delete"></span> Delete</a><div class="dropdown-divider"></div>'+
        '<a class="dropdown-item" href="javascript:;">Reinsurance</a><a class="dropdown-item" href="javascript:;">History</a><a class="dropdown-item" href="javascript:;">Policy Rules</a></div>';
                     

        $scope.gridOptions = {
            data : EclaimService.getEclaimList(true),
            columnDefs: [
                {name:'action', displayName:'', cellTemplate:staticTemplate,width:40, pinnedLeft:true, enableCellEdit:false},
                {name:'serviceType', displayName:'Service Type', cellTemplate:textTemplate,width:120},
                {name:'serviceCode', displayName:'Service code', cellTemplate:textTemplate,width:120},
                {name:'serviceFrmDate', displayName:'Service From', cellTemplate:dateTemplate,width:130},
                {name:'days', displayName:'Days', cellTemplate:numTemplate,width:80},
                {name:'quantity', displayName:'QTY', cellTemplate:numTemplate,width:80},
                {name:'treatmentCode', displayName:'Treatment Code', cellTemplate:textTemplate,width:140},
                {name:'rejectedCode', displayName:'Rejected Code', cellTemplate:textTemplate,width:130},
                {name:'dhaPrice', displayName:'HAAD/DHA Price', cellTemplate:numTemplate,width:145},
                {name:'price', displayName:'Price', cellTemplate:numTemplate,width:125},
                {name:'reqAmount', displayName:'Requested Amount', cellTemplate:numTemplate,width:165},
                {name:'dedAmount', displayName:'Ded Amount', cellTemplate:numTemplate,width:125},
                {name:'shortfallAmount', displayName:'Shortfall Amount', cellTemplate:numTemplate,width:155},
                {name:'rejDesc', displayName:'Rejection Description', cellTemplate:textTemplate,width:175},
                {name:'remarks', displayName:'Internal Remarks', cellTemplate:textTemplate,width:162},
                {name:'approvedAmt', displayName:'Approved Amount', cellTemplate:numTemplate,width:160, enableCellEdit:false},
                {name:'rejectedAmt', displayName:'Rejected Amount', cellTemplate:numTemplate,width:160, enableCellEdit:false},
                {name:'status', displayName:'Status', cellTemplate:textTemplate,width:145, enableCellEdit:false},
                {name:'settings', displayName:'Settings', cellTemplate:settingsTemplate,width:75, pinnedRight:true, enableCellEdit:false},          
            ],
            enableSorting: false
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
                $($('.ui-grid-render-container-body').children()).addClass('ui-grid-content');
                if($scope.action == 'new') {
                    $scope.prevEdittedRow = resp.grid.rows[$scope.gridOptions.data.length-1];
                    $scope.prevRowobj = angular.copy($scope.prevEdittedRow.entity);
                }
            });
        }

        $scope.addRow = function() {
            var newClaim = EclaimService.newClaim();
            newClaim.serviceType = ($scope.gridOptions.data.length +1 ).toString();
            newClaim.editable = true;
            newClaim.editedColName = 'serviceType';
            $scope.gridOptions.data.push(newClaim);
        }

        $scope.deleteRow = function(index) {
            $scope.gridOptions.data.splice(index, 1);
            renderTotals($scope.gridOptions.data);
            ngNotify.set('Claim Deleted Succesfully.', 'success');
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

        function init() {
           $scope.noOfSlides = 3;
           $scope.isToggled = true;
           if(window.innerWidth >= 1300) {
                $scope.noOfSlides = 4;
           }
        }

        $scope.toggleJson = function(item) {
            $scope.claim = item;
            $scope.isToggled = !$scope.isToggled;
            $scope.gridOptions.data = EclaimService.getEclaimList($scope.isToggled);
        }

        $scope.toggleSelect = function() {
            $scope.isChecked = !$scope.isChecked;
            angular.forEach($scope.gridOptions.data, function(value,key) {
                value.isChecked = $scope.isChecked;
            })
        }

        $scope.approveClaim = function() {
            ngNotify.set('Claim Approved Succesfully.', 'success');
        }

        $scope.rejectClaim = function() {   
            ngNotify.set('Claim Rejected.', 'error');
        }

        $scope.$watch('gridOptions.data', function(newValue, oldValue, scope) {
            renderTotals(newValue);
        });

        function renderTotals(result) {
            var totalApprovedAmount = 0;
            var totalRejectedAmount = 0;
            var totalDeductionAmount = 0;
            var totalPenaltyAmount = 0;
            angular.forEach(result, function(claim, key) {
                totalApprovedAmount += claim.approvedAmt;
                totalRejectedAmount += claim.rejectedAmt;
                totalDeductionAmount += claim.dedAmount;
                totalPenaltyAmount += claim.shortfallAmount;
            })
            $scope.totalApprovedAmount = totalApprovedAmount;
            $scope.totalRejectedAmount = totalRejectedAmount;
            $scope.totalDeductionAmount = totalDeductionAmount;
            $scope.totalPenaltyAmount = totalPenaltyAmount;
        }
        
        init();
    }
})();