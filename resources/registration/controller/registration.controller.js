(function() {
    'use strict';

    angular
        .module('claims')
        .controller('RegistrationController', RegistrationController)

    RegistrationController.$inject = ['$scope', '$rootScope', 'RegistrationService', 'ngNotify', '$filter'];

    function RegistrationController($scope, $rootScope, RegistrationService, ngNotify, $filter) {
        $scope.referenceNumber;
        $scope.memberNumber;
        $scope.ibanNumber;
        $scope.objectRest=[];
        $scope.claimTreatMent = [{
            referenceNumber: "8918563923549888739",
            memberNumber: "9566340416",
            memberName: "Ashraf",
            policyNumber: "0922418901",
            paymentType: "Cheque",
            ibanNumber: "897667890"
        }, {
            referenceNumber: "8742084269009888711",
            memberNumber: "8566340716",
            memberName: "Hussain",
            policyNumber: "0907878903",
            paymentType: "IBAN",
            ibanNumber: "882626789"

        }, {
            referenceNumber: "8600974274532888782",
            memberNumber: "9566340416",
            memberName: "Rahman",
            policyNumber: "0909833201",
            paymentType: "Cheque",
            ibanNumber: "784467838"
        }, {
            referenceNumber: "8709876783427123481",
            memberNumber: "7766340416",
            memberName: "Riyas",
            policyNumber: "0908828904",
            paymentType: "IBAN",
            ibanNumber: "896657871"

        }, {
            referenceNumber: "8409893521228678769",
            memberNumber: "3457678876",
            memberName: "Abdul Rahman",
            policyNumber: "0909676902",
            paymentType: "Cheque",
            ibanNumber: "867217887"
        }, {
            referenceNumber: "8209153782398887891",
            memberNumber: "8866340416",
            memberName: "Ansar",
            policyNumber: "0911388901",
            paymentType: "IBAN",
            ibanNumber: "999234520"
        }, {
            referenceNumber: "8909876789009888789",
            memberNumber: "3457678876",
            memberName: "Mohammed",
            policyNumber: "0988432909",
            paymentType: "Cheque",
            ibanNumber: "874832190"
        }, {
            referenceNumber: "8009876722822878913",
            memberNumber: "9566340416",
            memberName: "Abdul ",
            policyNumber: "0909886611",
            paymentType: "IBAN",
            ibanNumber: "985342618"
        }, {
            referenceNumber: "8809876789009888784",
            memberNumber: "9566340416",
            memberName: "Yasif",
            policyNumber: "0904532091",
            paymentType: "Cheque",
            ibanNumber: "984267890"
        }];


        $scope.objectRest = $scope.claimTreatMent;

        $scope.searchBtn = function() {
            if (($scope.referenceNumber == "" || $scope.referenceNumber == null) && ($scope.memberNumber == "" || $scope.memberNumber == null) && ($scope.ibanNumber == "" || $scope.ibanNumber == null)&&($scope.policyNumber == "" || $scope.policyNumber == null)) {
                $scope.claimTreatMent = $scope.objectRest;
            } else {
                $scope.claimTreatMent = $filter('filter')($scope.claimTreatMent, { referenceNumber: $scope.referenceNumber, memberNumber: $scope.memberNumber, ibanNumber: $scope.ibanNumber, policyNumber: $scope.policyNumber});
            }
        }

        //$scope.propertyName = 'referenceNumber';
        $scope.reverse = true;
        $scope.sortBy = function(propertyName) {
            $scope.reverse = ($scope.propertyName === propertyName) ? !$scope.reverse : false;
            $scope.propertyName = propertyName;
        };
    }
})()