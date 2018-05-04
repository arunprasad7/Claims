(function() {
    'use strict';

    angular
        .module('claims')
        .controller('EclaimProcessingController', EclaimProcessingController)

    EclaimProcessingController.$inject = ['$scope', '$rootScope', 'EclaimService', 'ngNotify'];

    function EclaimProcessingController($scope, $rootScope, EclaimService, ngNotify) {
        $scope.claimReqList = EclaimService.getClaimsRequest();
        $scope.claim = $scope.claimReqList[0];
        $scope.isToggled = true;
        $scope.isInlineEdit = true;
        $scope.moduleName = 'eclaim';

        $scope.gridOptions = {
            data : EclaimService.getEclaimList(true),
            columnDefs: [
                {name:'action', displayName:'', cellTemplate:'staticTemplate',width:40, pinnedLeft:true, enableCellEdit:false, enableColumnMenu: false},
                {name:'serviceType', displayName:'Service Type', cellTemplate:'textTemplate',width:120},
                {name:'serviceCode', displayName:'Service code', cellTemplate:'textTemplate',width:120},
                {name:'serviceFrmDate', displayName:'Service From', cellTemplate:'dateTemplate',width:130},
                {name:'days', displayName:'Days', cellTemplate:'numTemplate',width:80},
                {name:'quantity', displayName:'QTY', cellTemplate:'numTemplate',width:80},
                {name:'treatmentCode', displayName:'Treatment Code', cellTemplate:'textTemplate',width:140},
                {name:'rejectedCode', displayName:'Rejected Code', cellTemplate:'textTemplate',width:130},
                {name:'dhaPrice', displayName:'HAAD/DHA Price', cellTemplate:'numTemplate',width:145},
                {name:'price', displayName:'Price', cellTemplate:'numTemplate',width:125},
                {name:'reqAmount', displayName:'Requested Amount', cellTemplate:'numTemplate',width:165},
                {name:'dedAmount', displayName:'Ded Amount', cellTemplate:'numTemplate',width:125},
                {name:'shortfallAmount', displayName:'Shortfall Amount', cellTemplate:'numTemplate',width:155},
                {name:'rejDesc', displayName:'Rejection Description', cellTemplate:'textTemplate',width:175},
                {name:'remarks', displayName:'Internal Remarks', cellTemplate:'textTemplate',width:162},
                {name:'approvedAmt', displayName:'Approved Amount', cellTemplate:'numTemplate',width:160, enableCellEdit:false},
                {name:'rejectedAmt', displayName:'Rejected Amount', cellTemplate:'numTemplate',width:160, enableCellEdit:false},
                {name:'status', displayName:'Status', cellTemplate:'textTemplate',width:145, enableCellEdit:false},
                {name:'settings', displayName:'Settings', cellTemplate:'settingsTemplate',width:75, pinnedRight:true, enableCellEdit:false},          
            ],
            enableSorting: false
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

        $scope.toggleJson = function(item) {
            $scope.claim = item;
            $scope.isToggled = !$scope.isToggled;
            $scope.gridOptions.data = EclaimService.getEclaimList($scope.isToggled);
        }

        $scope.approveClaim = function() {
            if($scope.gridOptions.data.length) {
                ngNotify.set('Claim Approved Succesfully.', 'success');    
            } else {
                swal("", "No Records to Approve", "warning");
            }            
        }

        $scope.rejectClaim = function() {   
            if($scope.gridOptions.data.length) {
                ngNotify.set('Claim Rejected.', 'error');
            } else {
                swal("", "No Records to Reject", "warning");
            }
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
        
        $scope.gridAction = function(info) {
            switch(info.action) {
                case "new":
                    $scope.addRow()
                    break;
                case "edit":
                    console.log('Eclaim InlineEdit');
                    break;
                case "delete":
                    $scope.deleteRow(info.index);    
                    break;
                case "approve":
                    $scope.approveClaim(info.data);
                    break;
                case "reject":
                    $scope.rejectClaim(info.data);
                    break;
            }
        }
    }
})();