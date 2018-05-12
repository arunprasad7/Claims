(function() {
    'use strict';

    angular
        .module('claims')
        .controller('RegistrationController', RegistrationController)

    RegistrationController.$inject = ['$scope', '$rootScope', 'RegistrationService', 'ngNotify', '$filter', '$state', 'ListViewService'];

    function RegistrationController($scope, $rootScope, RegistrationService, ngNotify, $filter, $state, ListViewService) {

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
            $scope.fieldsObject =  RegistrationService.getSearchFields();
            $scope.autoSearchObject = RegistrationService.getUsers();
            $scope.registeredClaims = RegistrationService.getClaimRegistrationList();
            $scope.claims = $scope.registeredClaims;
        }

        init();
        
    }
})()