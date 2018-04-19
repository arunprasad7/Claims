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
            $scope.createNew = false;
            var staticTemplate = '<a href="javascript:;" class="custCheckboxBtn" ng-class="{\'custCheckboxBtnSected\' : row.entity.isChecked}" ng-click="row.entity.isChecked = !row.entity.isChecked"><span class="oi" data-glyph="check"></span></a>&nbsp;'+
            '<a href="javascript:;" class="eclaimReqSetBtn dropdown-toggle" style="padding:10px 10px 10px 10px;" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><span class="oi" data-glyph="wrench"></span></a><a class="eclaimReqSetBtn" href="javascript:;" ng-click="grid.appScope.editClaim(row.entity)"><span class="oi mr-1" data-glyph="pencil"></span></a>'+
            '<div class="dropdown-menu eclaimReqSetOption"><a class="dropdown-item" href="javascript:;" ng-click="grid.appScope.approveClaim()"><span class="oi mr-1" data-glyph="thumb-up"></span> Approve</a>'+
            '<a class="dropdown-item" href="javascript:;" ng-click="grid.appScope.rejectClaim()"><span class="oi mr-1" data-glyph="thumb-down"></span> Reject</a>'+
            '<a class="dropdown-item" href="javascript:;"><span class="oi mr-1" data-glyph="check"></span> Validate</a><a class="dropdown-item" href="javascript:;" ng-click="grid.appScope.deleteRow(rowRenderIndex)"><span class="oi mr-1" data-glyph="delete"></span> Delete</a><div class="dropdown-divider"></div>'+
            '<a class="dropdown-item" href="javascript:;">Reinsurance</a><a class="dropdown-item" href="javascript:;">History</a><a class="dropdown-item" href="javascript:;">Policy Rules</a></div>';

            var dateTemplate = '<div ng-if="!row.entity.editable || !col.colDef.enableCellEdit" style="padding:3px;">{{COL_FIELD | date:\'mediumDate\'}}</div><div ng-if="row.entity.editable && col.colDef.enableCellEdit" class="p1px">'+
            '<md-datepicker class="md-block" md-hide-icons="all" md-open-on-focus aria-label="{{row.entity.name}}" name="{{col.name}}" id="{{row.uid}}-{{col.name}}-edit-cell" ng-model="MODEL_COL_FIELD"></md-datepicker></div>';

            function init() {
                $scope.claim = createNewReimbursmentObject();
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
                    "isChecked" : false
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
                        'name' : codeType + ' 1859231-1' 
                    },
                    {
                        'code' : 2222,
                        'name' : codeType + ' 2054571-1' 
                    },
                    {
                        'code' : 3333,
                        'name' : codeType + ' 3451201-1' 
                    },
                    {
                        'code' : 4444,
                        'name' : codeType + ' 4579201-1' 
                    }
                ];
            }

            function initGrid() {
                $scope.gridOptions = {
                    data : EclaimService.getEclaimList(true),
                    columnDefs: [
                        {name:'action', displayName:'', cellTemplate:staticTemplate,width:145, pinnedLeft:true},
                        {name:'treatmentCodeOrSubBenefit.name', displayName:'Treatment Code/SubBenefit',width:200},
                        {name:'serviceFrom', displayName:'Service From', cellTemplate:dateTemplate,width:120},
                        {name:'serviceTo', displayName:'Service To', cellTemplate:dateTemplate,width:120},
                        {name:'days', displayName:'Days', width:90},
                        {name:'requestAmount', displayName:'Request Amount', width:140},
                        {name:'manualDeduction', displayName:'Manual Deduction', width:140},
                        {name:'rejectionCode.name', displayName:'Rejection Code',width:140},
                        {name:'policyDedAmount', displayName:'Policy Ded Amount',width:150},
                        {name:'penaltyAmount', displayName:'Penalty Amount', width:145},
                        {name:'suggesstedAmount', displayName:'Suggessted Amount', width:150},
                        {name:'approvedAmount', displayName:'Approved Amount', width:165},
                        {name:'rejectedAmount', displayName:'Rejected Amount', width:145},
                        {name:'status', displayName:'Status', width:155},
                        {name:'internalRemarks', displayName:'Internal Remarks',width:210},
                        {name:'externalRemarks', displayName:'External Remarks',width:210}
                    ],
                    enableSorting: false
                }
                $scope.noRecordsAvailable = $scope.gridOptions['data'].length == 0;

                $scope.gridOptions.onRegisterApi = function(gridApi) {
                    gridApi.core.on.rowsRendered( $scope, function(resp) {
                        $($('.ui-grid-render-container-body').children()).addClass('ui-grid-content');
                    });
                }
            }

            $scope.deleteRow = function(index) {
                $scope.gridOptions.data.splice(index, 1);
                ngNotify.set('Deleted Succesfully.', 'success');
            }

            $scope.approveClaim = function() {
                ngNotify.set('Claim Approved Succesfully.', 'success');
            }
    
            $scope.rejectClaim = function() {   
                ngNotify.set('Claim Rejected.', 'error');
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

            $scope.saveRecord = function() {
                if ($scope.claim && $scope.claim.treatmentCodeOrSubBenefit != "" && $scope.claim.treatmentCodeOrSubBenefit != null) {
                    $scope.gridOptions.data.push($scope.claim);
                    $scope.noRecordsAvailable = $scope.gridOptions['data'].length == 0;
                    $scope.claim = createNewReimbursmentObject();
                    $scope.createNew = false;
                    ngNotify.set('Saved Succesfully.', 'success');
                } else {
                    ngNotify.set('Treatment Code/Sub Benefit can\'t be empty.', 'error');
                }
            }

            $scope.editClaim = function(entity) {
                $scope.claim = entity;
                $scope.createNew = true;
                removeClaim(entity);
            }

            $scope.onCancel = function() {
                if ($scope.claimToRestore != undefined && $scope.claimToRestore != null) {
                    $scope.gridOptions['data'].push(angular.copy($scope.claimToRestore));
                    $scope.claim = createNewReimbursmentObject();
                }
                $scope.claimToRestore = null;
                $scope.createNew = false;
            }

            function removeClaim(element) {
                const index = $scope.gridOptions['data'].indexOf(element);
                if (index !== -1) {
                    $scope.gridOptions['data'].splice(index, 1);
                }
                $scope.claimToRestore = angular.copy(element);
            }

            init();
        }
})()