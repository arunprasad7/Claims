(function() {
    'use strict';

    angular
        .module('claims')
            .controller('ReimbursmentProcessingController', ReimbursmentProcessingController);

        ReimbursmentProcessingController.$inject = ['$scope', '$rootScope', 'ReimbursementProcessingService', 'EclaimService', 'ngNotify'];

        function ReimbursmentProcessingController($scope, ReimbursementProcessingService, EclaimService, ngNotify) {

            $scope.claimsResult = [];

            function init() {
                $scope.claimsResult.push(createNewReimbursmentObject());
                $scope.claimReqList = getClaimsRequest();
                $scope.noOfSlides = 3;
                if(window.innerWidth >= 1300) {
                     $scope.noOfSlides = 4;
                }
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

            init();
        }
})()