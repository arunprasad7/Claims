(function() {
    'use strict';
    angular
        .module('claims')
            .controller('ReimbursementFinalizationController', ReimbursementFinalizationController)

    ReimbursementFinalizationController.$inject = ['$scope', '$rootScope', 'ReimbursementFinalizationService', '$filter', 'ngNotify'];

    function ReimbursementFinalizationController($scope, $rootScope, ReimbursementFinalizationService, $filter, ngNotify) {

        $scope.selectall = false;
        $scope.result = [];
        $scope.claimsToFinalize = [];
        $scope.rerenderView = false;
        $scope.searchBy = {};

        $scope.finalizeSelectedClaims = function() {
            if ($scope.claimsToFinalize.length == 0) {
                swal("", "Please select any claims to finalize...", "warning");  
            } else {
                $scope.claimsToFinalize.forEach((claim, claimIndex) => {
                    for(var recordIndex in $scope.finalizationRecords) {
                        var actualClaim = $scope.finalizationRecords[recordIndex];
                        if (claim['id'] == actualClaim['id']) {
                            $scope.finalizationRecords.splice(recordIndex, 1);
                            break;
                        }
                    }
                })
                $scope.rerenderView = !$scope.rerenderView;
                ngNotify.set('Selected Batch\'s are finalized successfully...', 'success');
            }
        }

        $scope.filterValues = function(searchValue) {
            if (searchValue) {
                $scope.searchBy = { 
                    paymentReference: searchValue.payRef, 
                    paymentWay: searchValue.payWay, 
                    batch: searchValue.claimNumber 
                };
            } else {
                $scope.searchBy = {};
            }
        }

        function init() {
            $scope.data = ReimbursementFinalizationService.getFinailzationRecords();
            $scope.finalizationRecords = ReimbursementFinalizationService.getFinailzationRecords();
            $scope.result = $scope.data;
            $scope.recordTotal = $scope.data.length;
            $scope.dropDownValue = ReimbursementFinalizationService.getSearchDropDownValues();
            $scope.fieldsObject = ReimbursementFinalizationService.getSearchFields();
        }

        init();
    }
})();