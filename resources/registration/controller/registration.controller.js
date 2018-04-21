(function() {
    'use strict';

    angular
        .module('claims')
        .controller('RegistrationController', RegistrationController)

    RegistrationController.$inject = ['$scope', '$rootScope', 'RegistrationService', 'ngNotify', '$filter'];

    function RegistrationController($scope, $rootScope, RegistrationService, ngNotify, $filter) {
        $scope.referenceNumber;
        $scope.memberNumber;
        $scope.ibanNum;
        $scope.registeredClaims = RegistrationService.getClaimRegistrationList();


        $scope.claims= $scope.registeredClaims;

        $scope.searchBtn = function() {
            if (($scope.referenceNumber == "" || $scope.referenceNumber == null) && ($scope.memberNumber == "" || $scope.memberNumber == null) && ($scope.ibanNum == "" || $scope.ibanNum == null)&&($scope.policyNumber == "" || $scope.policyNumber == null)) {
                $scope.claims = $scope.registeredClaims;
            } else {
                $scope.claims = $filter('filter')($scope.registeredClaims, { referenceNumber: $scope.referenceNumber, memberNumber: $scope.memberNumber, ibanNum: $scope.ibanNum, policyNumber: $scope.policyNumber});
            }
        }

        $scope.reverse = true;
        $scope.sortBy = function(propertyName) {
            $scope.reverse = ($scope.propertyName === propertyName) ? !$scope.reverse : false;
            $scope.propertyName = propertyName;
        };
    }
})()