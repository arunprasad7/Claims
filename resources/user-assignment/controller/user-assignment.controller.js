(function() {
    'use strict';
    angular
        .module('claims')
        .controller('UserAssignmentController', UserAssignmentController)

    UserAssignmentController.$inject = ['$scope', '$rootScope', 'UserAssignmentService', '$filter'];

    function UserAssignmentController($scope, $rootScope, UserAssignmentService, $filter) {
        $scope.states = [{ display: 'Alabama', state: 'Alabama' }, { display: 'Alaska' }, { display: 'Arizona' }, { display: 'Arkansas' }, { display: 'Arkansas' }];
        $scope.name = '$scopevalue comes'
        $scope.memberNumber;
        $scope.voucherNumber;
        $scope.climeNo;
        $scope.approvedBy;
        $scope.requestedDate;
        $scope.chequePeriodFrom;
        $scope.assignedUser;
        $scope.nameAndID;
        $scope.searchText;
        $scope.result = [];
        $scope.selectall = false;
        $scope.claim = [{
            'climeNo': '456',
            'memberNo': '9563569856',
            'voucherNo': '45628',
            'encounterType': 'Inpatient',
            'requestRecievedOn': '23 jan 2018',
            'prevRequest': 'NA',
            'payMode': 'Cheque',
            'payDate': '08 Jan 2018',
            'payRefNo': '13212',
            'requestedAmount': '2,23,515',
            'approvedAmount': '1,00,500',
            'currencyCode': 'AED',
            'name': 'Osama Bin',
            'status': 'Rejected'
        }, {
            'climeNo': '2345790',
            'memberNo': '9563569856',
            'voucherNo': '45628',
            'encounterType': 'Inpatient',
            'requestRecievedOn': '2 jan 2017',
            'prevRequest': 'NA',
            'payMode': 'Cheque',
            'payDate': '08 Jan 2018',
            'payRefNo': '13212',
            'requestedAmount': '2,23,515',
            'approvedAmount': '1,00,500',
            'currencyCode': 'AED',
            'name': 'Rayan',
            'status': 'Approved'
        }, {
            'climeNo': '2345790',
            'memberNo': '9563569856',
            'voucherNo': '45628',
            'encounterType': 'Inpatient',
            'requestRecievedOn': '1 jan 2018',
            'prevRequest': 'NA',
            'payMode': 'Cheque',
            'payDate': '08 Jan 2018',
            'payRefNo': '13212',
            'requestedAmount': '3,23,515',
            'approvedAmount': '1,00,500',
            'currencyCode': 'AED',
            'name': 'Ansar',
            'status': 'Rejected'
        }, {
            'climeNo': '2345790',
            'memberNo': '9563569856',
            'voucherNo': '45628',
            'encounterType': 'Inpatient',
            'requestRecievedOn': '23 jan 2018',
            'prevRequest': 'NA',
            'payMode': 'Cheque',
            'payDate': '08 Jan 2018',
            'payRefNo': '13212',
            'requestedAmount': '4,23,515',
            'approvedAmount': '1,00,500',
            'currencyCode': 'AED',
            'name': 'Mohamed',
            'status': 'Rejected'
        }, {
            'climeNo': '2345790',
            'memberNo': '9563569856',
            'voucherNo': '45628',
            'encounterType': 'Inpatient',
            'requestRecievedOn': '23 jan 2018',
            'prevRequest': 'NA',
            'payMode': 'Cheque',
            'payDate': '08 Jan 2018',
            'payRefNo': '13212',
            'requestedAmount': '23,515',
            'approvedAmount': '1,00,500',
            'currencyCode': 'AED',
            'name': 'Abdur',
            'status': 'Rejected'
        }, {
            'climeNo': '2345790',
            'memberNo': '9563569856',
            'voucherNo': '45628',
            'encounterType': 'Inpatient',
            'requestRecievedOn': '23 jan 2018',
            'prevRequest': 'NA',
            'payMode': 'Cheque',
            'payDate': '08 Jan 2018',
            'payRefNo': '13212',
            'requestedAmount': '9,23,515',
            'approvedAmount': '1,00,500',
            'currencyCode': 'AED',
            'name': 'Parveen',
            'status': 'Approved'
        }, {
            'climeNo': '2345790',
            'memberNo': '9563569856',
            'voucherNo': '45628',
            'encounterType': 'Inpatient',
            'requestRecievedOn': '23 jan 2018',
            'prevRequest': 'NA',
            'payMode': 'Cheque',
            'payDate': '08 Jan 2018',
            'payRefNo': '13212',
            'requestedAmount': '23,515',
            'approvedAmount': '1,00,500',
            'currencyCode': 'AED',
            'name': 'Farook',
            'status': 'Rejected'
        }, {
            'climeNo': '2345790',
            'memberNo': '9563569856',
            'voucherNo': '45628',
            'encounterType': 'Inpatient',
            'requestRecievedOn': '23 jan 2018',
            'prevRequest': 'NA',
            'payMode': 'Cheque',
            'payDate': '08 Jan 2018',
            'payRefNo': '13212',
            'requestedAmount': '1,23,515',
            'approvedAmount': '1,00,500',
            'currencyCode': 'AED',
            'name': 'Hussain',
            'status': 'Waitingforapproval'
        }, {
            'climeNo': '2345790',
            'memberNo': '9563569856',
            'voucherNo': '45628',
            'encounterType': 'Inpatient',
            'requestRecievedOn': '23 jan 2018',
            'prevRequest': 'NA',
            'payMode': 'Cheque',
            'payDate': '08 Jan 2018',
            'payRefNo': '13212',
            'requestedAmount': '7,23,515',
            'approvedAmount': '1,00,500',
            'currencyCode': 'AED',
            'name': 'Banu',
            'status': 'InProgress'
        }, {
            'climeNo': '2345790',
            'memberNo': '9563569856',
            'voucherNo': '45628',
            'encounterType': 'Inpatient',
            'requestRecievedOn': '23 jan 2018',
            'prevRequest': 'NA',
            'payMode': 'Cheque',
            'payDate': '08 Jan 2018',
            'payRefNo': '13212',
            'requestedAmount': '8,23,515',
            'approvedAmount': '1,00,500',
            'currencyCode': 'AED',
            'name': 'Ashraf',
            'status': 'Waitingforapproval'
        }, {
            'climeNo': '2345790',
            'memberNo': '98',
            'voucherNo': '45628',
            'encounterType': 'Inpatient',
            'requestRecievedOn': '23 jan 2018',
            'prevRequest': 'NA',
            'payMode': 'Cheque',
            'payDate': '08 Jan 2018',
            'payRefNo': '13212',
            'requestedAmount': ',23,515',
            'approvedAmount': '1,00,500',
            'currencyCode': 'AED',
            'name': 'Raliya',
            'status': 'Assigned',
        }];

        $scope.users = [{
            'userId': '1234',
            'name': 'Jessica',
            'assigned': 5,
            'pending': 2,
            'climeNo': '2345790',
            'memberNo': '98',
            'voucherNo': '45628',
            'encounterType': 'Inpatient',
            'requestRecievedOn': '23 jan 2018',
            'prevRequest': 'NA',
            'payMode': 'Cheque',
            'payDate': '08 Jan 2018',
            'payRefNo': '13212',
            'requestedAmount': ',23,515',
            'approvedAmount': '1,00,500',
            'currencyCode': 'AED',
            'status': 'Assigned'
        }, {
            'userId': '1235',
            'name': 'John wick',
            'assigned': 19,
            'pending': 5,
            'climeNo': '2345790',
            'memberNo': '98',
            'voucherNo': '45628',
            'encounterType': 'Inpatient',
            'requestRecievedOn': '23 jan 2018',
            'prevRequest': 'NA',
            'payMode': 'Cheque',
            'payDate': '08 Jan 2018',
            'payRefNo': '13212',
            'requestedAmount': ',23,515',
            'approvedAmount': '1,00,500',
            'currencyCode': 'AED',
            'status': 'Assigned'
        }, {
            'userId': '1236',
            'name': 'Robert andrews',
            'assigned': 12,
            'pending': 8,
            'climeNo': '2345790',
            'memberNo': '98',
            'voucherNo': '45628',
            'encounterType': 'Inpatient',
            'requestRecievedOn': '23 jan 2018',
            'prevRequest': 'NA',
            'payMode': 'Cheque',
            'payDate': '08 Jan 2018',
            'payRefNo': '13212',
            'requestedAmount': ',23,515',
            'approvedAmount': '1,00,500',
            'currencyCode': 'AED',
            'status': 'Assigned'
        }, {
            'userId': '1237',
            'name': 'Aaban',
            'assigned': 11,
            'pending': 9,
            'climeNo': '2345790',
            'memberNo': '98',
            'voucherNo': '45628',
            'encounterType': 'Inpatient',
            'requestRecievedOn': '23 jan 2018',
            'prevRequest': 'NA',
            'payMode': 'Cheque',
            'payDate': '08 Jan 2018',
            'payRefNo': '13212',
            'requestedAmount': ',23,515',
            'approvedAmount': '1,00,500',
            'currencyCode': 'AED',
            'status': 'Assigned'
        }, {
            'userId': '1238',
            'name': 'Xueli',
            'assigned': 15,
            'pending': 3,
            'climeNo': '2345790',
            'memberNo': '98',
            'voucherNo': '45628',
            'encounterType': 'Inpatient',
            'requestRecievedOn': '23 jan 2018',
            'prevRequest': 'NA',
            'payMode': 'Cheque',
            'payDate': '08 Jan 2018',
            'payRefNo': '13212',
            'requestedAmount': ',23,515',
            'approvedAmount': '1,00,500',
            'currencyCode': 'AED',
            'status': 'Assigned'
        }];
        $scope.userssearch = $scope.users;
        $scope.result = $scope.claim;
        $scope.recordTotal = $scope.claim.length;
        $scope.datePicker = {};
        $scope.datePicker.date = { startDate: null, endDate: null };


        $scope.click = function() {
            if (($scope.climeNo == "" || $scope.climeNo == null) && ($scope.memberNumber == "" || $scope.memberNumber == null)) {
                $scope.claimList = $scope.result;
            } else {
                //$scope.claimList = $scope.claim;
                // $scope.claimList = $filter('filter')($scope.claimList ,{climeNo:$scope.climeNo,memberNo:$scope.memberNumber});
                $scope.claimList = $filter('filter')($scope.claim, { climeNo: $scope.climeNo, memberNo: $scope.memberNumber });

            }

        }



        $scope.result = $scope.users;
        $scope.submit = function() {
            $scope.searchText;
            if (($scope.searchText == "" || $scope.searchText == null)) {
                $scope.users = $scope.result;
            } else {
                $scope.users = $filter('filter')($scope.userssearch, { name: $scope.searchText });

            }
            $scope.requestType;
        }



        $scope.sorting = function(field) {
            $scope.orderByField = 'requestRecievedOn';
            $scope.reverseSort = (field == 'receivedDateDesc') ? false : true;
        };

        $scope.approvedClick = function() {
            $scope.Approved;
            console.log('Approved');
        }

        $scope.selectAll = function() {
            if (!$scope.selectall) {
                $scope.selectall = true;
                $scope.claimList.forEach(function(value) {
                    value.selected = true;
                });
                console.log("--------------", $scope.claimList);
            } else {
                $scope.selectall = false;
                $scope.claimList.forEach(function(value) {
                    value.selected = false;
                });
                console.log("--------------", $scope.claimList);
            }

        }
        $scope.datePicker = {};
        $scope.datePicker.date = { startDate: null, endDate: null };
        $scope.items = $scope.claim;


        $scope.changeTab = function() {
            var tab = $scope.tab;
            if (tab == 'Approved') {
                $scope.claimList = angular.copy($scope.approved);
            } else if (tab == 'InProgress') {
                $scope.claimList = angular.copy($scope.inProgress);
            } else if (tab == 'Rejected') {
                $scope.claimList = angular.copy($scope.rejected);
            } else if (tab == 'Waitingforapproval') {
                $scope.claimList = angular.copy($scope.waitingforapproval);
            } else if (tab == 'Assigned') {
                $scope.claimList = angular.copy($scope.assigned);
            } else {
                $scope.claimList = angular.copy($scope.claim);
            }
        }

        $scope.querySearch = function(query) {
            return query ? $scope.users.filter(createFilterFor(query)) : $scope.users;
        }

        $scope.selectedData = function(selectData) {
            $scope.userSelectedData = selectData;

        }

        $scope.assignedData = function() {
            var index = $scope.userssearch.indexOf($scope.userSelectedData)
            if (index >= 0) {
                $scope.assigned.push($scope.userSelectedData);
                $scope.changeTab();
                $scope.userssearch.splice(index, 1);
            }
            $scope.users = $scope.userssearch;
        }

        function createFilterFor(query) {
            var lowercaseQuery = angular.lowercase(query);

            return function filterFn(state) {
                return (((angular.lowercase(state.name).indexOf(lowercaseQuery) != 0) && angular.lowercase(state.name).indexOf(lowercaseQuery) != -1) || (angular.lowercase(state.name).indexOf(lowercaseQuery) === 0));
            };

        }

        function init() {
            $scope.claimList = $scope.claim;
            $scope.inProgress = $filter('filter')($scope.claim, { status: 'InProgress' });
            $scope.approved = $filter('filter')($scope.claim, { status: 'Approved' });
            $scope.rejected = $filter('filter')($scope.claim, { status: 'Rejected' });
            $scope.waitingforapproval = $filter('filter')($scope.claim, { status: 'Waitingforapproval' });
            $scope.assigned = $filter('filter')($scope.claim, { status: 'Assigned' });
            $scope.tab = "newRequest";
        }

        init();
    }
})();