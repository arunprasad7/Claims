(function() {
    'use strict';

    angular
        .module('claims')
            .controller('ReimbursmentProcessingController', ReimbursmentProcessingController);

        ReimbursmentProcessingController.$inject = ['$scope', '$rootScope', 'ReimbursementProcessingService', 'ngNotify', '$timeout'];

        function ReimbursmentProcessingController($scope, $rootScope, ReimbursementProcessingService, ngNotify, $timeout) {

            $scope.treatmentCodes = [];
            $scope.rejectionCode = [];
            $scope.createNew = true;
            $scope.accordionToggle = {
                isProviderDetailOpen : true,
                isClaimDetailOpen : false,
                isPolicyDetailOpen : false,
                isMemberDetailOpen : false
            }

            function init() {
                $scope.isInlineEdit = false;
                $scope.moduleName = 'reimbursement';
                $scope.currencyType = '1';
                $scope.claim = ReimbursementProcessingService.createNewReimbursmentObject();
                $scope.claimReqList = ReimbursementProcessingService.getClaimsRequest();
                $scope.treatmentCodes = ReimbursementProcessingService.getCodes('T');
                $scope.rejectionCodes = ReimbursementProcessingService.getCodes('R');
                initGrid();
                $scope.selectedClaim = {'claimNo' : 80010201, 'requestNo' : 10010201-1, 'status' : 'Approved', 'policyNo' : 80010201, 'memberNo' : 10010201-1};

                $scope.providerDetails = {
                    'primaryDiagnosis' : '501.02',
                    'primaryDiagDisc' : 'Surgery',
                    'secDiagnosis' : '301.2,508.2',
                    'secDiagnosisDesc' : 'secDiagnosisDesc',
                    'providerName' : 'Alnoor Hospital',
                    'providerCode' : '4341',
                    'providerLicense' : 'MF28291',
                    'voucherNumber' : 'MDC345674',
                    'encounterType' : '',
                    'claimType' : '',
                    'providerNetwork' : 'P,S,G'
                }
                $scope.claimDetails = {
                    'country' : ''
                }
                $scope.policyDetails = {
                    'claimCondition' : 'pecial Case/Ex-Gratia',
                    'policyNumber' : '515621',
                    'policyName' : 'Medic Policy',
                    'policyStart' : null,
                    'claimPaidTo' : 'Principle Member/Customer'
                }
                $scope.memberDetails = {
                    'memberName' : 'Khalifa',
                    'memberNo' : '500001-1-A',
                    'category' : 'B',
                    'gender' : 'Male',
                    'age' : 52,
                    'memberNetwork' : 'P',
                    'memberTerminatedDate' : null,
                    'memberStartDate' : null,
                    'dependencyOrRelation' : 'Principle Member'
                }
            }

            $scope.createNewClaim = function() {
                $scope.createNew = true;
                $scope.claim = ReimbursementProcessingService.createNewReimbursmentObject();
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

            function initGrid() {
                $scope.gridOptions = {
                    data : [],
                    columnDefs: [
                        {name:'action', displayName:'', headerCellTemplate:'headerCheckboxTemplate.html', cellTemplate:'staticTemplate.html',width:40, pinnedLeft:true, enableColumnMenu: false},
                        {name:'treatmentCodeOrSubBenefit.name', displayName:'Treatment Code/SubBenefit',width:200},
                        {name:'serviceFrom', displayName:'Service From', cellTemplate:'dateTemplate.html',width:120},
                        {name:'serviceTo', displayName:'Service To', cellTemplate:'dateTemplate.html',width:110},
                        {name:'days', displayName:'Days', width:90},
                        {name:'requestAmount', displayName:'Request Amount', width:140, convertCurrency:true},
                        {name:'policyDedAmount', displayName:'Policy Ded Amount',width:150, convertCurrency:true},
                        {name:'manualDeduction', displayName:'Manual Deduction', width:140, convertCurrency:true},
                        {name:'penaltyAmount', displayName:'Penalty Amount', width:145, convertCurrency:true},
                        {name:'suggesstedAmount', displayName:'Suggessted Amount', width:150, convertCurrency:true},
                        {name:'approvedAmount', displayName:'Approved Amount', width:165, convertCurrency:true},
                        {name:'rejectedAmount', displayName:'Rejected Amount', width:145, convertCurrency:true},
                        {name:'rejectionCode.name', displayName:'Rejection Code',width:140},
                        {name:'rejectionDesc', displayName:'Rejection Description',width:210},
                        {name:'status', displayName:'Status', width:155},
                        {name:'internalRemarks', displayName:'Internal Remarks', cellTemplate:'descriptionTemplate.html', width:210},
                        {name:'externalRemarks', displayName:'External Remarks', cellTemplate:'descriptionTemplate.html', width:210},
                        {name:'Settings', displayName:'Settings', cellTemplate:'settingsTemplate.html',width:75, pinnedRight:true, enableColumnMenu: false}
                    ],
                    enableSorting: false,
                    enableVerticalScrollbars : 'Never'
                }
            }

            $scope.deleteRow = function(index) {
                $scope.gridOptions.data.splice(index, 1);
                renderTotals($scope.gridOptions.data);
                ngNotify.set('Deleted Succesfully.', 'success');
            }

            $scope.approveClaim = function(claim) {
                if($scope.gridOptions.data.length) {
                    ngNotify.set('Claim Approved Succesfully.', 'success');
                } else {
                    swal("", "No Records to Approve", "warning");
                }
            }
    
            $scope.rejectClaim = function() {
                if($scope.gridOptions.data.length) {
                    ngNotify.set('Claim Rejected.', 'error');
                } else {
                    swal("", "No Records to Reject", "warning");
                }
            }
            
            $scope.saveRecord = function(saveType) {
                processClaim($scope.claim);
                $scope.claim = ReimbursementProcessingService.createNewReimbursmentObject();
                $scope.createNew = saveType == 'SaveAndNew';
                ngNotify.set('Saved Succesfully.', 'success');
        }

            $scope.editClaim = function(entity) {
                $scope.claim = angular.copy(entity);
                $scope.claim['dml'] = 'E';
                $scope.createNew = true;
            }

            $scope.onCancel = function() {
                $scope.createNew = false;
            }

            $scope.toggleJson = function(selectedClaim) {
                $scope.selectedClaim = ReimbursementProcessingService.getClaimHeaderDetails(selectedClaim.reqNum);
                $scope.gridOptions.data = ReimbursementProcessingService.getRequestDataForCalim(selectedClaim.reqNum);
            }

            function processClaim(claim) {
                $scope.gridOptions['data'] = $scope.gridOptions['data'].map(record =>  {
                    if (record['id'] == claim['id']) {
                        return claim;
                    }
                    return record;
                });
                if (claim['dml'] == 'N') {
                    $scope.gridOptions['data'].push(claim);
                }
            }

            $scope.$watch('gridOptions.data', function(newValue, oldValue, scope) {
                renderTotals(newValue);
            });

            $scope.submitForApproval = function(claim) {
                if($scope.gridOptions.data.length) {
                    if (validateInformationSection()) {
                        $scope.infoToggle = false;
                        ngNotify.set('Claim Approved Succesfully.', 'success');
                    }
                } else {
                    swal("", "No Records to Approve", "warning");
                }
            }

            function validateInformationSection() {
                $scope.submitted = true;
                var policyErrorArray = [];
                var memberErrorArray = [];
                var claimErrorArray = [];
                var providerErrorArray = [];

                var policyDetailsRequiredFields = ['claimCondition'];
                var memberDetailsRequiredFields = ['memberName','memberNo','category','gender'];
                var claimDetailsRequiredFields = ['country'];
                var providerDetailsRequiredFields = ['primaryDiagnosis', 'primaryDiagDisc', 'secDiagnosis', 'secDiagnosisDesc', 'providerName', 'providerCode', 
                                                    'providerLicense', 'voucherNumber', 'encounterType', 'claimType'];
                
                angular.forEach(providerDetailsRequiredFields, function(fieldName, key) {
                    if ($scope.providerDetails[fieldName] == '' || $scope.providerDetails[fieldName] == null) {
                        providerErrorArray.push(fieldName);
                    }
                });

                angular.forEach(claimDetailsRequiredFields, function(fieldName, key) {
                    if ($scope.claimDetails[fieldName] == '' || $scope.claimDetails[fieldName] == null) {
                        claimErrorArray.push(fieldName);
                    }
                });

                angular.forEach(policyDetailsRequiredFields, function(fieldName, key) {
                    if ($scope.policyDetails[fieldName] == '' || $scope.policyDetails[fieldName] == null) {
                        policyErrorArray.push(fieldName);
                    }
                });

                angular.forEach(memberDetailsRequiredFields, function(fieldName, key) {
                    if ($scope.memberDetails[fieldName] == '' || $scope.memberDetails[fieldName] == null) {
                        memberErrorArray.push(fieldName);
                    }
                });

                $scope.accordionToggle.isProviderDetailOpen = (providerErrorArray.length > 0);
                $scope.accordionToggle.isClaimDetailOpen = (claimErrorArray.length > 0);
                $scope.accordionToggle.isPolicyDetailOpen = (policyErrorArray.length > 0);
                $scope.accordionToggle.isMemberDetailOpen = (memberErrorArray.length > 0);                
                $scope.isCloseOthers = $scope.reimbursementForm.$valid;
                if ($scope.reimbursementForm.$invalid) {
                    swal("Please Enter all the required fields", "", "error").then(
                        function() {
                            ($scope.reimbursementForm.$error.required[0].$$element[0]).focus();
                        }
                    );
                    $scope.infoToggle = true;
                    return false;
                }
                return $scope.reimbursementForm.$valid;
            }

            function renderTotals(result) {
                var totalApprovedAmount = 0;
                var totalRejectedAmount = 0;
                var totalPenaltyAmount = 0;
                var totalDeductionAmount = 0;
                angular.forEach(result, function(claim, key) {
                    totalApprovedAmount += claim.approvedAmount;
                    totalRejectedAmount += claim.rejectedAmount;
                    totalPenaltyAmount += claim.penaltyAmount;
                    totalDeductionAmount += claim.manualDeduction;
                })
                $scope.totalApprovedAmount = totalApprovedAmount;
                $scope.totalRejectedAmount = totalRejectedAmount;
                $scope.totalPenaltyAmount = totalPenaltyAmount;
                $scope.totalDeductionAmount = totalDeductionAmount;
            }

            $scope.toggleInfo = function() {
                $scope.infoToggle = !$scope.infoToggle;
                $scope.accordionToggle.isProviderDetailOpen = $scope.accordionToggle.isProviderDetailOpen ? $scope.accordionToggle.isProviderDetailOpen : $scope.reimbursementForm.$valid;
                $scope.isCloseOthers = true;
            }

            $scope.gridAction = function(info) {
                switch(info.action) {
                    case "new":
                        $scope.createNewClaim()
                        break;
                    case "edit":
                        $scope.editClaim(info.data);
                        break;
                    case "delete":
                        $scope.deleteRow(info.index);    
                        break;
                    case "approve":
                        $scope.approveClaim(info.data);
                        break;
                    case "reject":
                        $scope.rejectClaim(info.data);
                        break;
                    case "convertCurrency":
                        renderTotals($scope.gridOptions.data);
                        break;    
                }
            }

            init();
        }
})()