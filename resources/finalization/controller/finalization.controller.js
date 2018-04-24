(function() {
    'use strict';
    angular
        .module('claims')
        .controller('FinalizationController', FinalizationController)

    FinalizationController.$inject = ['$scope', '$rootScope', 'FinalizationService', '$filter', 'ngNotify'];

    function FinalizationController($scope, $rootScope, FinalizationService, $filter, ngNotify) {
        //$scope.firstName = $scope.batchName;
        $scope.batchName;
        $scope.fileName;
        $scope.Provider;
        $scope.BatchId;
        $scope.BatchFileName;
        $scope.result = [];
        $scope.data = [{
            batch: " #111111",
            batchFileName: "671-652d-d3453-MF17152-A002-CLAIM",
            receivedDate: '30 jan 2018',
            PaidToProviderCode: "4241",
            PaidToProviderName: "Al Noor Hospital",
            PaidTo: "Al Noor Hospital",
            Processed: "500000",
            unProcessed: "568890",
            rejectedAmount: "1,00,500",
            batchPaidAmount: "1,00,500",
            paymentWay: "Type of way",
            totalClaims: "923,515",
            paymentDate: "25 Mar 2018",
            paymentReference: "Type of Reference",
            status: "Approved",
            selected : false
        }, {
            batch: " #222222",
            batchFileName: "6718281-652d-d3453-MF17152-A002-CLAIM",
            receivedDate: '19 jan 2018',
            PaidToProviderCode: "4241",
            PaidToProviderName: "Al Noor Hospital",
            PaidTo: "Al Noor Hospital",
            Processed: "500000",
            unProcessed: "568890",
            rejectedAmount: "1,00,500",
            batchPaidAmount: "1,00,500",
            paymentWay: "Type of way",
            totalClaims: "238,515",
            paymentDate: "25 Mar 2018",
            paymentReference: "Type of Reference",
            status: "Approved",
            selected : false
        }, {
            batch: "#22333",
            batchFileName: "6718281-652d-d3453-MF17152-A002-CLAIM",
            receivedDate: '19 jan 2018',
            PaidToProviderCode: "4241",
            PaidToProviderName: "Al Noor Hospital",
            PaidTo: "Al Noor Hospital",
            Processed: "900000",
            unProcessed: "568890",
            rejectedAmount: "1,00,500",
            batchPaidAmount: "1,00,500",
            paymentWay: "Type of way",
            totalClaims: "673,515",
            paymentDate: "25 Mar 2018",
            paymentReference: "Type of Reference",
            status: "Rejected",
            selected : false
        }, {
            batch: " #444444",
            batchFileName: "6718281-652d-d3453-MF17152-A002-CLAIM",
            receivedDate: '1 jan 2018',
            PaidToProviderCode: "4241",
            PaidToProviderName: "Al Noor Hospital",
            PaidTo: "Al Noor Hospital",
            Processed: "500000",
            unProcessed: "568890",
            rejectedAmount: "1,00,500",
            batchPaidAmount: "1,00,500",
            paymentWay: "Type of way",
            totalClaims: "423,515",
            paymentDate: "25 Mar 2018",
            paymentReference: "Type of Reference",
            status: "Rejected",
            selected : false
        }, {
            batch: " #555555",
            batchFileName: "6718281-652d-d3453-MF17152-A002-CLAIM",
            receivedDate: '23 jan 2018',
            PaidToProviderCode: "4241",
            PaidToProviderName: "Al Noor Hospital",
            PaidTo: "Al Noor Hospital",
            Processed: "500000",
            unProcessed: "568890",
            rejectedAmount: "1,00,500",
            batchPaidAmount: "1,00,500",
            paymentWay: "Type of way",
            totalClaims: "33,515",
            paymentDate: "25 Mar 2018",
            paymentReference: "Type of Reference",
            status: "Rejected",
            selected : false
        }, {
            batch: "#666666",
            batchFileName: "A003-CLAIM",
            receivedDate: '24 jan 2018',
            PaidToProviderCode: "4241",
            PaidToProviderName: "Al Noor Hospital",
            PaidTo: "Al Noor Hospital",
            Processed: "500000",
            unProcessed: "568890",
            rejectedAmount: "1,00,500",
            batchPaidAmount: "1,00,500",
            paymentWay: "Type of way",
            totalClaims: "223,515",
            paymentDate: "25 Mar 2018",
            paymentReference: "Type of Reference",
            status: "Rejected",
            selected : false
        }];
        $scope.result = $scope.data;
        $scope.recordTotal = $scope.data.length;

        $scope.click = function() {
            if (($scope.Provider == "" || $scope.Provider == null) && ($scope.BatchId == "" || $scope.BatchId == null) && ($scope.BatchFileName == "" || $scope.BatchFileName == null)) {
                $scope.data = $scope.result;
            } else {
                $scope.data = $filter('filter')($scope.data, { PaidToProviderName: $scope.Provider, batch: $scope.BatchId, batchFileName: $scope.BatchFileName });
            }
            $scope.requestType;
        }

        $scope.sorting = function(field) {
            $scope.orderByField = 'receivedDate';
            $scope.reverseSort = (field == 'receivedDateDesc') ? false : true;
        };



        $scope.isActive = false;
        $scope.activeButton = function() {
            $scope.isActive = !$scope.isActive;
        }

        $scope.finalizeBatch = function() {
            var result = [];
            var records = angular.copy($scope.data);
            angular.forEach(records, function(record, key) {
                if (!record.selected) {
                    result.push(record);
                }
            })
            $scope.data = result;
            ngNotify.set('Selected Batch\'s are finalized successfully...', 'success');
        }

        function init() {
            $scope.option = "receivedDateDesc";
            $scope.sorting($scope.option);
        }
        init();
    }
})();