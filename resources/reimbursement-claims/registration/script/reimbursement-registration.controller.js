(function() {
    'use strict';

    angular
        .module('claims')
        .controller('ReimbursementRegistrationController', ReimbursementRegistrationController)

    ReimbursementRegistrationController.$inject = ['$scope', '$rootScope', 'ReimbursementRegistrationService', 'ngNotify', '$filter', '$state', 'ListViewService'];

    function ReimbursementRegistrationController($scope, $rootScope, ReimbursementRegistrationService, ngNotify, $filter, $state, ListViewService) {

        $scope.reverse = true;

        $scope.filterValues = function(searchValue) {
            if (searchValue) {
                $scope.searchBy = {
                    memberNumber : searchValue['memberNumber'] ? searchValue['memberNumber']['memberNumber'] : '',
                    memberName : searchValue['memberName'] ? searchValue['memberName']['memberName'] : '',
                    emiratesId :searchValue['emiratesId'] ? searchValue['emiratesId'] : '',
                    voucherNumber : searchValue['voucherNumber'] ? searchValue['voucherNumber'] : '',
                    policyNumber: searchValue['policyNumber'] ? searchValue['policyNumber']['policyNumber'] : ''
                };
            } else {
                $scope.searchBy = {};
            }
        }
      
        function init() {
            $scope.registrationHeaders = ListViewService.getRegistrationListViewHeader();
            $scope.fieldsObject =  ReimbursementRegistrationService.getSearchFields();
            $scope.autoSearchObject = ReimbursementRegistrationService.getUsers();
            $scope.registeredClaims = ReimbursementRegistrationService.getClaimRegistrationList();
            $scope.claims = $scope.registeredClaims;
        }

        init();
        
    }
})()