(function() {
    'use strict';

    angular
        .module('claims')
            .controller('ReimbursmentProcessingController', ReimbursmentProcessingController);

        ReimbursmentProcessingController.$inject = ['$scope', '$rootScope', 'ReimbursementProcessingService', 'EclaimService', 'ngNotify'];

        function ReimbursmentProcessingController($scope, $rootScope, ReimbursementProcessingService, EclaimService, ngNotify) {

            $scope.claimsResult = [];
            $scope.treatmentCodes = [];
            $scope.rejectionCode = [];
            var staticTemplate = '<a href="javascript:;" class="custCheckboxBtn" ng-class="{\'custCheckboxBtnSected\' : row.entity.isChecked}" ng-click="row.entity.isChecked = !row.entity.isChecked"><span class="oi" data-glyph="check"></span></a>&nbsp;'+
            '<a href="javascript:;" class="eclaimReqSetBtn dropdown-toggle"" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><span class="oi" data-glyph="wrench"></span></a>'+
            '<div class="dropdown-menu eclaimReqSetOption"><a class="dropdown-item" href="javascript:;" ng-click="grid.appScope.approveClaim()"><span class="oi mr-1" data-glyph="thumb-up"></span> Approve</a>'+
            '<a class="dropdown-item" href="javascript:;" ng-click="grid.appScope.rejectClaim()"><span class="oi mr-1" data-glyph="thumb-down"></span> Reject</a><a class="dropdown-item" href="javascript:;" ng-click="grid.appScope.editClaim(row.entity)"><span class="oi mr-1" data-glyph="pencil"></span> Edit</a>'+
            '<a class="dropdown-item" href="javascript:;"><span class="oi mr-1" data-glyph="check"></span> Validate</a><a class="dropdown-item" href="javascript:;" ng-click="grid.appScope.deleteRow(rowRenderIndex)"><span class="oi mr-1" data-glyph="delete"></span> Delete</a><div class="dropdown-divider"></div>'+
            '<a class="dropdown-item" href="javascript:;">Reinsurance</a><a class="dropdown-item" href="javascript:;">History</a><a class="dropdown-item" href="javascript:;">Policy Rules</a></div>';

            function init() {
                $scope.claimsResult.push(createNewReimbursmentObject());
                $scope.claimReqList = getClaimsRequest();
                $scope.noOfSlides = 3;
                if(window.innerWidth >= 1300) {
                     $scope.noOfSlides = 4;
                }
                $scope.treatmentCodes = getCodes('T');
                $scope.rejectionCodes = getCodes('R');
                initGrid();
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

            function getCodes(codeType) {
                return [
                    {
                        'code' : 1111,
                        'name' : codeType + ' Code 1' 
                    },
                    {
                        'code' : 2222,
                        'name' : codeType + ' Code 2' 
                    },
                    {
                        'code' : 3333,
                        'name' : codeType + ' Code 3' 
                    },
                    {
                        'code' : 4444,
                        'name' : codeType + ' Code 4' 
                    }
                ];
            }

            function initGrid() {
                $scope.gridOptions = {
                    data : EclaimService.getEclaimList(true),
                    columnDefs: [
                        {name:'action', displayName:'', cellTemplate:staticTemplate,width:80, pinnedLeft:true},
                        {name:'treatmentCodeOrSubBenefit', displayName:'Treatment Code/SubBenefit',width:180},
                        {name:'serviceFrom', displayName:'Service From',width:120},
                        {name:'serviceTo', displayName:'Service To',width:120},
                        {name:'days', displayName:'Days', width:130},
                        {name:'requestAmount', displayName:'Request Amount', width:80},
                        {name:'manualDeduction', displayName:'Manual Deduction', width:80},
                        {name:'rejectionCode', displayName:'Rejection Code',width:140},
                        {name:'policyDedAmount', displayName:'Policy Ded Amount',width:130},
                        {name:'penaltyAmount', displayName:'Penalty Amount', width:145},
                        {name:'suggesstedAmount', displayName:'Suggessted Amount', width:125},
                        {name:'approvedAmount', displayName:'Approved Amount', width:165},
                        {name:'rejectedAmount', displayName:'Rejected Amount', width:125},
                        {name:'status', displayName:'Status', width:155},
                        {name:'internalRemarks', displayName:'Internal Remarks',width:175},
                        {name:'externalRemarks', displayName:'External Remarks',width:162}
                    ],
                    enableSorting: false
                }

                $scope.gridOptions.onRegisterApi = function(gridApi) {
                    gridApi.core.on.rowsRendered( $scope, function(resp) {
                        $($('.ui-grid-render-container-body').children()).addClass('ui-grid-content');
                    });
                }
            }

            $scope.deleteRow = function(index) {
                $scope.gridOptions.data.splice(index, 1);
                ngNotify.set('Claim Deleted Succesfully.', 'success');
            }

            $scope.approveClaim = function() {
                ngNotify.set('Claim Approved Succesfully.', 'success');
            }
    
            $scope.rejectClaim = function() {   
                ngNotify.set('Claim Rejected.', 'error');
            }

            $scope.editClaim = function(claim) {
                $scope.reimbCliam = claim;
                console.log('claim ::', claim);
            }

            $scope.toggleSelect = function() {
                $scope.isChecked = !$scope.isChecked;
                angular.forEach($scope.gridOptions.data, function(value,key) {
                    value.isChecked = $scope.isChecked;
                })
            }

            $('#right-button').click(function() {
                event.preventDefault();
                $('.ui-grid-content').animate({
                scrollLeft: "+=322px"
                }, "slow");
            });
            
            $('#left-button').click(function() {
                event.preventDefault();
                $('.ui-grid-content').animate({
                    scrollLeft: "-=322px"
                }, "slow");
            });

            init();
        }
})()