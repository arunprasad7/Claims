(function() {
    'use strict';

    angular
        .module('claims')
            .controller('ReimbursmentProcessingController', ReimbursmentProcessingController);

        ReimbursmentProcessingController.$inject = ['$scope', '$rootScope', 'ReimbursementProcessingService', 'EclaimService', 'ngNotify'];

        function ReimbursmentProcessingController($scope, ReimbursementProcessingService, EclaimService, ngNotify) {

            $scope.claimsResult = [];
            $scope.treatmentCodes = [];
            $scope.rejectionCode = [];

            function init() {
                $scope.claimsResult.push(createNewReimbursmentObject());
                $scope.claimReqList = getClaimsRequest();
                $scope.noOfSlides = 3;
                if(window.innerWidth >= 1300) {
                     $scope.noOfSlides = 4;
                }
                $scope.treatmentCodes = getCodes('T');
                $scope.rejectionCodes = getCodes('R');
            }

            $scope.createNew = function() {
                $scope.claimsResult.push(createNewReimbursmentObject());
            }

            $scope.deleteRecord = function(recordIndex) {
                if ($scope.claimsResult.length > 0) {
                    $scope.claimsResult.splice(recordIndex, 1);
                }
            }

            $scope.selectAll = function(checkAll) {
                angular.forEach($scope.claimsResult, function(claim, key) {
                    $scope.claimsResult[key]['onCheck'] = checkAll;
                })
            }

            $scope.getWidth = function() {
                if($scope.infoToggle) {
                    return (window.innerWidth - 380) + 'px';
                }
                return (window.innerWidth - 100) + 'px';
            }

            $scope.querySearch = function(query, codeType) {
                if (codeType == 'R') {
                    return query ? $scope.rejectionCodes.filter(createFilterFor(query)) : $scope.rejectionCodes;
                } else {
                    return query ? $scope.treatmentCodes.filter(createFilterFor(query)) : $scope.treatmentCodes;
                }
            }

            function createFilterFor(query) {
                var lowercaseQuery = angular.lowercase(query);
    
                return function filterFn(state) {
                    return (((angular.lowercase(state.name).indexOf(lowercaseQuery) != 0) && angular.lowercase(state.name).indexOf(lowercaseQuery) != -1) || (angular.lowercase(state.name).indexOf(lowercaseQuery) === 0));
                };
    
            }

            function createNewReimbursmentObject() {
                return {
                    "treatmentCodeOrSubBenefit" : "",
                    "serviceFrom" : "",
                    "serviceTo" : "",
                    "days" : "",
                    "requestAmount" : "",
                    "manualDeduction" : "",
                    "rejectionCode" : "",
                    "policyDedAmount" : "",
                    "penaltyAmount" : "",
                    "suggesstedAmount" : "",
                    "approvedAmount" : "",
                    "rejectedAmount" : "",
                    "status" : "",
                    "internalRemarks" : "",
                    "externalRemarks" : "",
                    "onCheck" : false
                };
            }

            function getClaimsRequest() {
                return [
                    {'reqNum': 987896, 'claimStatus':'rejected', 'statusReason':'Waiting for Finalization', 'rejectedReason':'Waiting for Finalization'},
                    {'reqNum': 187896, 'claimStatus':'rejected', 'statusReason':'Waiting for Approval', 'rejectedReason':'Waiting for Finalization'},
                    {'reqNum': 287896, 'claimStatus':'rejected', 'statusReason':'Waiting for Finalization', 'rejectedReason':'Waiting for Finalization'},
                    {'reqNum': 387896, 'claimStatus':'rejected', 'statusReason':'Waiting for Approval', 'rejectedReason':'Waiting for Finalization'},
                    {'reqNum': 487896, 'claimStatus':'rejected', 'statusReason':'Waiting for Approval', 'rejectedReason':'Waiting for Finalization'},
                    {'reqNum': 587896, 'claimStatus':'rejected', 'statusReason':'Waiting for Approval', 'rejectedReason':'Waiting for Finalization'},
                    {'reqNum': 687896, 'claimStatus':'rejected', 'statusReason':'Waiting for Approval', 'rejectedReason':'Waiting for Finalization'}
                ];
            }

            function getCodes(codeType) {
                return [
                    {
                        'code' : 1111,
                        'name' : codeType + ' Code 1' 
                    },
                    {
                        'code' : 2222,
                        'name' : codeType + ' Code 2' 
                    },
                    {
                        'code' : 3333,
                        'name' : codeType + ' Code 3' 
                    },
                    {
                        'code' : 4444,
                        'name' : codeType + ' Code 4' 
                    }
                ];
            }

            init();
        }
})()