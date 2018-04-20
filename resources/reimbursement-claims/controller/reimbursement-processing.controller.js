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
            $scope.createNew = true;
            var staticTemplate = '<a href="javascript:;" class="custCheckboxBtn" ng-class="{\'custCheckboxBtnSected\' : row.entity.isChecked}" ng-click="row.entity.isChecked = !row.entity.isChecked"><span class="oi" data-glyph="check"></span></a>&nbsp;'+
            '<a href="javascript:;" class="eclaimReqSetBtn dropdown-toggle" style="padding:10px 10px 10px 10px;" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><span class="oi" data-glyph="wrench"></span></a><a class="eclaimReqSetBtn" href="javascript:;" ng-click="grid.appScope.editClaim(row.entity)"><span class="oi mr-1" data-glyph="pencil"></span></a>'+
            '<div class="dropdown-menu eclaimReqSetOption"><a class="dropdown-item" href="javascript:;" ng-click="grid.appScope.approveClaim(row.entity)"><span class="oi mr-1" data-glyph="thumb-up"></span> Approve</a>'+
            '<a class="dropdown-item" href="javascript:;" ng-click="grid.appScope.rejectClaim(row.entity)"><span class="oi mr-1" data-glyph="thumb-down"></span> Reject</a>'+
            '<a class="dropdown-item" href="javascript:;"><span class="oi mr-1" data-glyph="check"></span> Validate</a><a class="dropdown-item" href="javascript:;" ng-click="grid.appScope.deleteRow(rowRenderIndex)"><span class="oi mr-1" data-glyph="delete"></span> Delete</a><div class="dropdown-divider"></div>'+
            '<a class="dropdown-item" href="javascript:;">Reinsurance</a><a class="dropdown-item" href="javascript:;">History</a><a class="dropdown-item" href="javascript:;">Policy Rules</a></div>';

            var dateTemplate = '<div ng-if="!row.entity.editable || !col.colDef.enableCellEdit" style="padding:3px;">{{COL_FIELD | date:\'mediumDate\'}}</div><div ng-if="row.entity.editable && col.colDef.enableCellEdit" class="p1px">'+
            '<md-datepicker class="md-block" md-hide-icons="all" md-open-on-focus aria-label="{{row.entity.name}}" name="{{col.name}}" id="{{row.uid}}-{{col.name}}-edit-cell" ng-model="MODEL_COL_FIELD"></md-datepicker></div>';

            function init() {
                $scope.claim = createNewReimbursmentObject();
                $scope.claimsResult.push(createNewReimbursmentObject());
                $scope.claimReqList = getClaimsRequest();
                $scope.treatmentCodes = getCodes('T');
                $scope.rejectionCodes = getCodes('R');
                initGrid();
            }

            $scope.createNewClaim = function() {
                $scope.createNew = true;
                $scope.claim = createNewReimbursmentObject();
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
                    "isChecked" : false,
                    "id" : new Date().getTime(),
                    "dml": "N"
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
                    },
                    {
                        'code' : 5555,
                        'name' : codeType + ' 5463201-1' 
                    }
                ];
            }

            function initGrid() {
                $scope.gridOptions = {
                    data : [],
                    columnDefs: [
                        {name:'action', displayName:'', cellTemplate:staticTemplate,width:145, pinnedLeft:true},
                        {name:'treatmentCodeOrSubBenefit.name', displayName:'Treatment Code/SubBenefit',width:200},
                        {name:'serviceFrom', displayName:'Service From', cellTemplate:dateTemplate,width:120},
                        // {name:'serviceTo', displayName:'Service To', cellTemplate:dateTemplate,width:120},
                        {name:'days', displayName:'Days', width:90},
                        {name:'requestAmount', displayName:'Request Amount', width:140},
                        {name:'policyDedAmount', displayName:'Policy Ded Amount',width:150},
                        {name:'manualDeduction', displayName:'Manual Deduction', width:140},
                        {name:'penaltyAmount', displayName:'Penalty Amount', width:145},
                        {name:'suggesstedAmount', displayName:'Suggessted Amount', width:150},
                        {name:'approvedAmount', displayName:'Approved Amount', width:165},
                        {name:'rejectedAmount', displayName:'Rejected Amount', width:145},
                        {name:'rejectionCode.name', displayName:'Rejection Code',width:140},
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
                $scope.noRecordsAvailable = $scope.gridOptions['data'].length == 0;
                ngNotify.set('Deleted Succesfully.', 'success');
            }

            $scope.approveClaim = function(claim) {
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

            $scope.saveRecord = function(saveType) {
                if ($scope.claim && $scope.claim.treatmentCodeOrSubBenefit != "" && $scope.claim.treatmentCodeOrSubBenefit != null) {
                    processClaim($scope.claim);
                    $scope.noRecordsAvailable = $scope.gridOptions['data'].length == 0;
                    $scope.claim = createNewReimbursmentObject();
                    $scope.createNew = saveType == 'SaveAndNew';
                    ngNotify.set('Saved Succesfully.', 'success');
                } else {
                    ngNotify.set('Treatment Code/Sub Benefit can\'t be empty.', 'error');
                }
            }

            $scope.editClaim = function(entity) {
                $scope.claim = angular.copy(entity);
                $scope.claim['dml'] = 'E';
                $scope.createNew = true;
            }

            $scope.onCancel = function() {
                $scope.createNew = false;
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

            init();
        }
})()