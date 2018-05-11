(function() {
    'use strict';
    angular
        .module('claims')
            .controller('FinalizationController', FinalizationController)

    FinalizationController.$inject = ['$scope', '$rootScope', 'FinalizationService', '$filter', 'ngNotify','$timeout'];

    function FinalizationController($scope, $rootScope, FinalizationService, $filter, ngNotify, $timeout) {

        $scope.batchName;
        $scope.fileName;
        $scope.Provider;
        $scope.BatchId;
        $scope.BatchFileName;
        $scope.selectall = false;
        $scope.result = [];
        $scope.isActive = false;
        $scope.claimsToFinalize = [];
        $scope.rerenderView = false;

        $scope.click = function() {
            if (($scope.paymentReference == "" || $scope.paymentReference == null) && ($scope.BatchId == "" || $scope.BatchId == null) && ($scope.paymentWay == "" || $scope.paymentWay == null)) {
                $scope.data = $scope.result;
            } else {
                $scope.data = $filter('filter')($scope.result,{ paymentReference: $scope.paymentReference, batch: $scope.BatchId, paymentWay: $scope.paymentWay });
            }
        }

        $scope.clear = function() {
            $scope.paymentReference = '';
            $scope.BatchId = '';
            $scope.paymentWay = '';
            $scope.data = $scope.result;
        }       
        
        $scope.activeButton = function() {
            $scope.isActive = !$scope.isActive;
        }

        $scope.selectAll = function() {
            if (!$scope.selectall) {
                $scope.selectall = true;
                $scope.data.forEach(function(value) {
                    value.selected = true;
                });
            } else {
               $scope.selectall = false;
               $scope.data.forEach(function(value) {
                    value.selected = false;
                });
            }
        }   

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
            $scope.data = $scope.result;
            if (searchValue) {
                $scope.data = $filter('filter')($scope.data, { paymentReference: searchValue.payRef, paymentWay: searchValue.payWay, batch: searchValue.claimNumber });
            } else {
                $scope.data = $scope.result;
            }
        }

        function init() {
            $scope.data = FinalizationService.getFinailzationRecords();
            $scope.finalizationRecords = FinalizationService.getFinailzationRecords();
            $scope.result = $scope.data;
            $scope.recordTotal = $scope.data.length;
            $scope.dropDownValue = FinalizationService.getSearchDropDownValues();
            $scope.fieldsObject = FinalizationService.getSearchFields();
        }

        init();
    }
})();