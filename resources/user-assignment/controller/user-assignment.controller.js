(function() {
    'use strict';
    angular
        .module('claims')
        .controller('UserAssignmentController', UserAssignmentController)

    UserAssignmentController.$inject = ['$scope', '$rootScope', 'UserAssignmentService', '$filter', '$state', '$stateParams', 'ngNotify', 'ListViewService'];

    function UserAssignmentController($scope, $rootScope, UserAssignmentService, $filter, $state, $stateParams, ngNotify, ListViewService) {
        $scope.selectedClaim = $stateParams.param;
        $scope.selectall = false;
        $scope.selectedUserToAssign;

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

        $scope.sorting = function(field) {
            $scope.orderByField = 'requestRecievedOn';
            $scope.reverseSort = (field == 'receivedDateDesc') ? false : true;
        };

        $scope.selectAll = function() {
            if (!$scope.selectall) {
                $scope.selectall = true;
                $scope.claimList.forEach(function(value) {
                    value.selected = true;
                });
            } else {
                $scope.selectall = false;
                $scope.claimList.forEach(function(value) {
                    value.selected = false;
                });
            }
        }

        $scope.changeTab = function(isdelete) {
            var tab = $scope.tab;
            if (tab == 'Approved') {
                if(isdelete) $scope.approved.splice($scope.assignedIndex, 1);
                $scope.claimList = angular.copy($scope.approved);
            } else if (tab == 'InProgress') {
                if(isdelete) $scope.inProgress.splice($scope.assignedIndex, 1);
                $scope.claimList = angular.copy($scope.inProgress);
            } else if (tab == 'Rejected') {
                if(isdelete) $scope.rejected.splice($scope.assignedIndex, 1);
                $scope.claimList = angular.copy($scope.rejected);
            } else if (tab == 'Waitingforapproval') {
                if(isdelete) $scope.waitingforapproval.splice($scope.assignedIndex, 1);
                $scope.claimList = angular.copy($scope.waitingforapproval);
            } else if (tab == 'Assigned') {
                if(isdelete) $scope.assigned.splice($scope.assignedIndex, 1);
                $scope.claimList = angular.copy($scope.assigned);
            } else {
                if(isdelete) $scope.claim.splice($scope.assignedIndex, 1);
                $scope.claimList = angular.copy($scope.claim);
            }
        }

        $scope.querySearch = function(query) {
            return query ? $scope.users.filter(createFilterFor(query)) : $scope.users;
        }
        
        $scope.claimToAssign = function(selectData, index) {
            $scope.assignedValue = selectData;
            $scope.assignedIndex = index;
        }
        
        $scope.assignedToSelectedUser = function() {
            if ($scope.selectedUserToAssign != null && $scope.assignedValue != null) {
                if ($scope.selectedUserToAssign.assigned < 15) {
                    $scope.assigned.push($scope.assignedValue);
                    $scope.selectedUserToAssign.assigned += 1;
                    $scope.changeTab(true);
                    ngNotify.set('Request Assigned Succesfully.', 'success');                
                } else {
                    swal("", "User has Request Assigned more than 15", "warning");
                }
            } else if ($scope.assignedValue == null && $scope.selectedUserToAssign == null) {
                swal("", "Please select claims and user to assign.", "warning");
            } else if ($scope.assignedValue == null) {
                swal("", "Please select claims to assign.", "warning");
            } else if ($scope.selectedUserToAssign == null) {
                swal("", "Please select user to assign.", "warning");
            }
        }
       
        $scope.navigateTo = function() {
            $state.go($scope.selectedClaim == 'eclaims' ? 'eclaim' : 'reimbursement-processing');
        }

        function createFilterFor(query) {
            var lowercaseQuery = angular.lowercase(query);
            return function filterFn(state) {
                return (((angular.lowercase(state.name).indexOf(lowercaseQuery) != 0) && angular.lowercase(state.name).indexOf(lowercaseQuery) != -1) || (angular.lowercase(state.name).indexOf(lowercaseQuery) === 0));
            };
        }

        function init() {
            $scope.claim = UserAssignmentService.getClaimsForUserAssignment();
            $scope.users = UserAssignmentService.getUsers();
            $scope.claimList = $scope.claim;
            $scope.inProgress = $filter('filter')($scope.claim, { status: 'InProgress' });
            $scope.approved = $filter('filter')($scope.claim, { status: 'Approved' });
            $scope.rejected = $filter('filter')($scope.claim, { status: 'Rejected' });
            $scope.waitingforapproval = $filter('filter')($scope.claim, { status: 'Waitingforapproval' });
            $scope.assigned = $filter('filter')($scope.claim, { status: 'Assigned' });
            $scope.tab = "newRequest";
            $scope.option = "receivedDateDesc";
            $scope.sorting($scope.option);
            $scope.userAssignmentHeader = ListViewService.getUserAssignmentListViewHeader();
            $scope.userssearch = $scope.users;
            $scope.recordTotal = $scope.claim.length;
            $scope.result = $scope.users;
        }

        init();
    }    
})();