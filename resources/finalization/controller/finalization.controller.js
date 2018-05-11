(function() {
    'use strict';
    angular
        .module('claims')
        .controller('FinalizationController', FinalizationController)

    FinalizationController.$inject = ['$scope', '$rootScope', 'FinalizationService', '$filter', 'ngNotify','$timeout','FinalizationComponentService'];

    function FinalizationController($scope, $rootScope, FinalizationService, $filter, ngNotify, $timeout, FinalizationComponentService) {

        // $scope.$watch("citySearchText", function(citySearchText) {
        //     $scope.sample;
        //     $scope.citySearchResults = [];
        //     if (citySearchText) {
        //     //$timeout(function() {
        //         $scope.isSearchingForCities = false;
        //         //$scope.citySearchResults = ['New York', 'London', 'Paris', 'Moab'];
        //         $scope.c = [{Processed: "500000"}, {Processed: "6000"}];
        //         $scope.citySearchResults = $filter('filter')($scope.c,{Processed : citySearchText});
        //         //$scope.citySearchResults = $scope.citySearchResults[0].Processed;
        //     //}, 1000);
        //     } else {
        //     $scope.isSearchingForCities = false;
        //     }
        // });

        $scope.batchName;
        $scope.fileName;
        $scope.Provider;
        $scope.BatchId;
        $scope.BatchFileName;
        $scope.selectall = false;
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
            rejectedAmount: "1,80,500",
            batchPaidAmount: "1,00,500",
            paymentWay: "cheque",
            totalClaims: "923,515",
            paymentDate: "25 Mar 2018",
            paymentReference: "698536",
            status: "Approved",
           
        }, {
            batch: " #222222",
            batchFileName: "6718281-652d-d3453-MF17152-A002-CLAIM",
            receivedDate: '19 jan 2018',
            PaidToProviderCode: "4241",
            PaidToProviderName: "Al Noor Hospital",
            PaidTo: "Al Noor Hospital",
            Processed: "500000",
            unProcessed: "568890",
            rejectedAmount: "1,30,400",
            batchPaidAmount: "1,00,500",
            paymentWay: "Iban",
            totalClaims: "238,515",
            paymentDate: "25 Mar 2018",
            paymentReference: "129856",
            status: "Approved",
        }, {
            batch: "#22333",
            batchFileName: "6718281-652d-d3453-MF17152-A002-CLAIM",
            receivedDate: '19 jan 2018',
            PaidToProviderCode: "4241",
            PaidToProviderName: "Al Noor Hospital",
            PaidTo: "Al Noor Hospital",
            Processed: "900000",
            unProcessed: "568890",
            rejectedAmount: "1,20,530",
            batchPaidAmount: "1,00,500",
            paymentWay: "Cheque",
            totalClaims: "673,515",
            paymentDate: "25 Mar 2018",
            paymentReference: "485698",
            status: "Rejected",
        }, {
            batch: " #444444",
            batchFileName: "6718281-652d-d3453-MF17152-A002-CLAIM",
            receivedDate: '1 jan 2018',
            PaidToProviderCode: "4241",
            PaidToProviderName: "Al Noor Hospital",
            PaidTo: "Al Noor Hospital",
            Processed: "500000",
            unProcessed: "568890",
            rejectedAmount: "1,80,400",
            batchPaidAmount: "1,00,500",
            paymentWay: "Iban",
            totalClaims: "423,515",
            paymentDate: "25 Mar 2018",
            paymentReference: "885369",
            status: "Rejected",
        }, {
            batch: " #555555",
            batchFileName: "6718281-652d-d3453-MF17152-A002-CLAIM",
            receivedDate: '23 jan 2018',
            PaidToProviderCode: "4241",
            PaidToProviderName: "Al Noor Hospital",
            PaidTo: "Al Noor Hospital",
            Processed: "500000",
            unProcessed: "568890",
            rejectedAmount: "1,10,520",
            batchPaidAmount: "1,00,500",
            paymentWay: "Cheque",
            totalClaims: "33,515",
            paymentDate: "25 Mar 2018",
            paymentReference: "268754",
            status: "Rejected",
           
        }, {
            batch: "#666666",
            batchFileName: "A003-CLAIM",
            receivedDate: '24 jan 2018',
            PaidToProviderCode: "4241",
            PaidToProviderName: "Al Noor Hospital",
            PaidTo: "Al Noor Hospital",
            Processed: "500000",
            unProcessed: "568890",
            rejectedAmount: "1,90,500",
            batchPaidAmount: "1,00,500",
            paymentWay: "Iban",
            totalClaims: "223,515",
            paymentDate: "25 Mar 2018",
            paymentReference: "789652",
            status: "Rejected",
           
        }];
        $scope.result = $scope.data;
        $scope.recordTotal = $scope.data.length;

        $scope.click = function() {
            if (($scope.paymentReference == "" || $scope.paymentReference == null) && ($scope.BatchId == "" || $scope.BatchId == null) && ($scope.paymentWay == "" || $scope.paymentWay == null)) {
                $scope.data = $scope.result;
            } else {
                $scope.data = $filter('filter')($scope.result,{ paymentReference: $scope.paymentReference, batch: $scope.BatchId, paymentWay: $scope.paymentWay });
            }
            $scope.requestType;
        }
        $scope.clear=function() {
            $scope.paymentReference='';
            $scope.BatchId='';
            $scope.paymentWay='';
            $scope.data = $scope.result;
        }       
        
        $scope.sorting = function(field) {
            $scope.orderByField = 'receivedDate';
            $scope.reverseSort = (field == 'receivedDateDesc') ? false : true;
        };



        $scope.isActive = false;
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

        $scope.dropDownValue = [{text:'Cheque'},
                                {text:'Iban'} 
                               ];

        $scope.fieldsObject = [{label : 'Payment Reference', type  :'text', name :'payRef'},
                               {label : 'Payment Way', type : 'dropDown', name :'payWay'},
                               {label : 'Claim Number', type : 'text', name :'claimNumber'}
                              ];

        $scope.filterValues = function(searchValue) {
            $scope.data = $scope.result;
            if (searchValue) {
                $scope.data = $filter('filter')($scope.data,{paymentReference :searchValue.payRef, paymentWay : searchValue.payWay, batch : searchValue.claimNumber});
            } else {
                $scope.data = $scope.result;
            }
                $scope.requestType
        }

        function init() {
            $scope.option = "receivedDateDesc";
            $scope.sorting($scope.option);
            $scope.finalizationHeaders = FinalizationComponentService.getFinalizationHeader();
        }
        init();
    }
})();