(function() {
    'use strict';
    angular
        .module('claims')
        .controller('ReimbursementUserAssignmentController', ReimbursementUserAssignmentController)

    ReimbursementUserAssignmentController.$inject = ['$scope', '$rootScope', 'ReimbursementUserAssignmentService', '$filter', '$state', '$stateParams', 'ngNotify', 'ListViewService', 'ClaimsListViewService'];

    function ReimbursementUserAssignmentController($scope, $rootScope, ReimbursementUserAssignmentService, $filter, $state, $stateParams, ngNotify, ListViewService, ClaimsListViewService) {
        // $scope.selectedClaim = $stateParams.param;
        $scope.selectall = false;
        $scope.selectedUserToAssign;
        $scope.claimsToAssign = [];
        $scope.claimList = [];
        $scope.rerenderView = false;
        $scope.filteredClaims = [];
        $scope.searchBy = {};

        $scope.search = function() {
            if (($scope.climeNo == "" || $scope.climeNo == null) && ($scope.memberNumber == "" || $scope.memberNumber == null) && ($scope.voucherNumber == "" || $scope.voucherNumber == null)) {
                $scope.claimList = $scope.claim;
            } else {
                $scope.claimList = $filter('filter')($scope.claim, { climeNo: $scope.climeNo, memberNo: $scope.memberNumber,voucherNo: $scope.voucherNumber});
            }
        }

        $scope.clear = function() {
            $scope.climeNo = '';
            $scope.memberNumber = '';
            $scope.voucherNumber = '';
            $scope.approvedBy = undefined;
            $scope.assignedUser = undefined;
            $scope.requestedFromDate = undefined;
            $scope.requestedToDate = undefined;
            $scope.claimList = $scope.claim;
        }

        $scope.querySearch = function(query) {
            return query ? $scope.users.filter(createFilterFor(query)) : $scope.users;
        }
        
        $scope.assignedToSelectedUser = function() {
            if ($scope.selectedUserToAssign != null && $scope.claimsToAssign != null && $scope.claimsToAssign.length > 0) {
                if ($scope.selectedUserToAssign.assigned < 15) {
                    angular.forEach($scope.claimsToAssign, function(claim, claimIndex) {
                        for(var key in $scope.claimList) {
                            var actualClaim = $scope.claimList[key];
                            if (claim['id'] == actualClaim['id']) {
                                $scope.claimList[key]['status'] = 'Assigned';
                                $scope.claimList[key]['selected'] = false;
                                break;
                            }
                        }
                    })
                    $scope.rerenderView = !$scope.rerenderView;
                    $scope.selectedUserToAssign.assigned += ($scope.claimsToAssign.length);
                    $scope.claimsToAssign = [];
                    ngNotify.set('Request Assigned Succesfully.', 'success');                
                } else {
                    swal("", "User has Request Assigned more than 15", "warning");
                }
            } else if ($scope.claimsToAssign.length == 0 && $scope.selectedUserToAssign == null) {
                swal("", "Please select claims and user to assign.", "warning");
            } else if ($scope.claimsToAssign.length == 0) {
                swal("", "Please select claims to assign.", "warning");
            } else if ($scope.selectedUserToAssign == null) {
                swal("", "Please select user to assign.", "warning");
            }
        }
       
        $scope.navigateTo = function() {
            $state.go('reimbursement-processing');
        }

        $scope.filterValues = function(searchValue) {
            if (searchValue) {
                $scope.searchBy = {
                    memberNo: searchValue.memberNo,
                    claimNo: searchValue.cliamNumber
                };
            } else {
                $scope.searchBy = {};
            }
        }

        function createFilterFor(query) {
            var lowercaseQuery = angular.lowercase(query);
            return function filterFn(state) {
                return (((angular.lowercase(state.name).indexOf(lowercaseQuery) != 0) && angular.lowercase(state.name).indexOf(lowercaseQuery) != -1) || (angular.lowercase(state.name).indexOf(lowercaseQuery) === 0));
            };
        }

        function init() {
            $scope.claim = ReimbursementUserAssignmentService.getClaimsForUserAssignment();
            $scope.users = $scope.userNamesObject = ReimbursementUserAssignmentService.getUsers();
            $scope.claimList = $scope.claim;
            $scope.userAssignmentHeader = ListViewService.getUserAssignmentListViewHeader();
            $scope.userssearch = $scope.users;
            $scope.recordTotal = $scope.claim.length;
            $scope.result = $scope.users;
            $scope.tabsToDisplay = ClaimsListViewService.getTabsToDisplay();
            $scope.fieldsObject =  ReimbursementUserAssignmentService.getSearchFields();
        }

        init();
    }    
})();