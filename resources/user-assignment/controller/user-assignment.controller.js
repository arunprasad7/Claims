(function() {
    'use strict';
    angular
        .module('claims')
        .controller('UserAssignmentController', UserAssignmentController)

    UserAssignmentController.$inject = ['$scope', '$rootScope', 'UserAssignmentService', '$filter', '$state', '$stateParams', 'ngNotify'];



    function UserAssignmentController($scope, $rootScope, UserAssignmentService, $filter, $state, $stateParams, ngNotify) {
        $scope.selectedClaim = $stateParams.param;
        $scope.states = [{ display: 'Alabama', state: 'Alabama' }, { display: 'Alaska' }, { display: 'Arizona' }, { display: 'Arkansas' }, { display: 'Arkansas' }];
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
        $scope.chckedIndexs=[];
        $scope.claim = [{
            'climeNo': '456',
            'memberNo': '9562467936',
            'voucherNo': '49228',
            'encounterType': 'Inpatient',
            'requestRecievedOn': '23 jan 2018',
            'prevRequest': 'NA',
            'payMode': 'Cheque',
            'payDate': '08 Jan 2018',
            'payRefNo': '19212',
            'requestedAmount': '2,23,515',
            'approvedAmount': '1,00,550',
            'currencyCode': 'AED',
            'name': 'Osama Bin',
            'status': 'Rejected'
        }, {
            'climeNo': '3365430',
            'memberNo': '9563569856',
            'voucherNo': '14098',
            'encounterType': 'Inpatient',
            'requestRecievedOn': '02 jan 2017',
            'prevRequest': 'NA',
            'payMode': 'IBAN',
            'payDate': '02 Jan 2018',
            'payRefNo': '13212',
            'requestedAmount': '2,23,515',
            'approvedAmount': '1,70,530',
            'currencyCode': 'AED',
            'name': 'Rayan',
            'status': 'Approved'
        }, {
            'climeNo': '4388960',
            'memberNo': '9563509632',
            'voucherNo': '39028',
            'encounterType': 'Inpatient',
            'requestRecievedOn': '01 jan 2018',
            'prevRequest': 'NA',
            'payMode': 'Cheque',
            'payDate': '09 Jan 2018',
            'payRefNo': '13072',
            'requestedAmount': '3,23,515',
            'approvedAmount': '1,90,500',
            'currencyCode': 'AED',
            'name': 'Ansar',
            'status': 'Rejected'
        }, {
            'climeNo': '63424531',
            'memberNo': '9563281452',
            'voucherNo': '67248',
            'encounterType': 'Inpatient',
            'requestRecievedOn': '18 jan 2018',
            'prevRequest': 'NA',
            'payMode': 'IBAN',
            'payDate': '07 Jan 2018',
            'payRefNo': '08912',
            'requestedAmount': '4,23,515',
            'approvedAmount': '1,60,900',
            'currencyCode': 'AED',
            'name': 'Mohamed',
            'status': 'Rejected'
        }, {
            'climeNo': '5975210',
            'memberNo': '9509634521',
            'voucherNo': '93521',
            'encounterType': 'Inpatient',
            'requestRecievedOn': '14 jan 2018',
            'prevRequest': 'NA',
            'payMode': 'Cheque',
            'payDate': '11 Jan 2018',
            'payRefNo': '10212',
            'requestedAmount': '23,515',
            'approvedAmount': '1,80,590',
            'currencyCode': 'AED',
            'name': 'Abdur',
            'status': 'Rejected'
        }, {
            'climeNo': '7221790',
            'memberNo': '9560756432',
            'voucherNo': '90983',
            'encounterType': 'Inpatient',
            'requestRecievedOn': '19 jan 2018',
            'prevRequest': 'NA',
            'payMode': 'IBAN',
            'payDate': '21` Jan 2018',
            'payRefNo': '188212',
            'requestedAmount': '9,23,515',
            'approvedAmount': '1,40,580',
            'currencyCode': 'AED',
            'name': 'Parveen',
            'status': 'Approved'
        }, {
            'climeNo': '9743210',
            'memberNo': '9563982314',
            'voucherNo': '76721',
            'encounterType': 'Inpatient',
            'requestRecievedOn': '03 jan 2018',
            'prevRequest': 'NA',
            'payMode': 'Cheque',
            'payDate': '10 Jan 2018',
            'payRefNo': '13288',
            'requestedAmount': '23,515',
            'approvedAmount': '1,20,500',
            'currencyCode': 'AED',
            'name': 'Farook',
            'status': 'Rejected'
        }, {
            'climeNo': '8345700',
            'memberNo': '95097865431',
            'voucherNo': '11231',
            'encounterType': 'Inpatient',
            'requestRecievedOn': '25 jan 2018',
            'prevRequest': 'NA',
            'payMode': 'IBAN',
            'payDate': '08 Jan 2018',
            'payRefNo': '13212',
            'requestedAmount': '1,23,515',
            'approvedAmount': '1,30,700',
            'currencyCode': 'AED',
            'name': 'Hussain',
            'status': 'Waitingforapproval'
        }, {
            'climeNo': '10850',
            'memberNo': '984169856',
            'voucherNo': '98754',
            'encounterType': 'Inpatient',
            'requestRecievedOn': '09 jan 2018',
            'prevRequest': 'NA',
            'payMode': 'Cheque',
            'payDate': '14 Jan 2018',
            'payRefNo': '15642',
            'requestedAmount': '7,23,515',
            'approvedAmount': '1,20,600',
            'currencyCode': 'AED',
            'name': 'Banu',
            'status': 'InProgress'
        }, {
            'climeNo': '2345862',
            'memberNo': '9754269856',
            'voucherNo': '87623',
            'encounterType': 'Inpatient',
            'requestRecievedOn': '23 jan 2018',
            'prevRequest': 'NA',
            'payMode': 'IBAN',
            'payDate': '08 Jan 2018',
            'payRefNo': '13234',
            'requestedAmount': '8,23,515',
            'approvedAmount': '1,50,520',
            'currencyCode': 'AED',
            'name': 'Ashraf',
            'status': 'Waitingforapproval'
        }, {
            'climeNo': '22342230',
            'memberNo': '9209269856',
            'voucherNo': '45628',
            'encounterType': 'Inpatient',
            'requestRecievedOn': '30 jan 2018',
            'prevRequest': 'NA',
            'payMode': 'Cheque',
            'payDate': '20 Jan 2018',
            'payRefNo': '10022',
            'requestedAmount': ',23,515',
            'approvedAmount': '1,50,500',
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
            if (($scope.climeNo == "" || $scope.climeNo == null) && ($scope.memberNumber == "" || $scope.memberNumber == null) && ($scope.voucherNumber == "" || $scope.voucherNumber == null)) {
                $scope.claimList = $scope.result;
            } else {
                
                $scope.claimList = $filter('filter')($scope.claim, { climeNo: $scope.climeNo, memberNo: $scope.memberNumber,voucherNo: $scope.voucherNumber});

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

        $scope.selectedData = function(selectData,index) {
            $scope.userSelectedData = selectData;
        }
        
        $scope.assignedtouser = function(selectData, index) {
            $scope.assignedValue = selectData;
            $scope.assignedIndex = index;
        }
        
        $scope.assignedData = function() {
            if ($scope.userSelectedData != null && $scope.assignedValue != null) {
                // var indexNewRwquest = $scope.claim.indexOf($scope.assignedValue);
                // var indexUser = $scope.userssearch.indexOf($scope.userSelectedData);
                // $scope.assignedValue.status = 'Assigned';
                if ($scope.userSelectedData.assigned < 15) {
                    //$scope.claimList.splice($scope.assignedIndex, 1);
                    $scope.assigned.push($scope.assignedValue);
                    $scope.changeTab(true);
                    $scope.userSelectedData.assigned += 1;
                    ngNotify.set('Request Assigned Succesfully.', 'success');                
                } else {
                    swal("", "User has Request Assigned more than 15", "warning");
                }
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
            $scope.claimList = $scope.claim;
            $scope.inProgress = $filter('filter')($scope.claim, { status: 'InProgress' });
            $scope.approved = $filter('filter')($scope.claim, { status: 'Approved' });
            $scope.rejected = $filter('filter')($scope.claim, { status: 'Rejected' });
            $scope.waitingforapproval = $filter('filter')($scope.claim, { status: 'Waitingforapproval' });
            $scope.assigned = $filter('filter')($scope.claim, { status: 'Assigned' });
            $scope.tab = "newRequest";
            $scope.option = "receivedDateDesc";
            $scope.sorting($scope.option);
        }

        init();
    }    
})();