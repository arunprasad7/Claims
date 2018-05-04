(function() {
    'use strict';

    function ClaimsListViewController($scope, $element, $attrs, $filter) {

        this.countByStatus = {};
        this.selectAll = false;
        this.sortBy = 'receivedDateDesc';
        this.orderByField = 'requestRecievedOn';
        this.reverseSort = false;
        this.filterByStatus = 'New Request';

        this.$onInit = function() {
            this.tab = this.statuslist ? this.statuslist[0].tab : 'newRequest';
            angular.forEach(this.statuslist, (statusRecord, index) => {
                if (index == 0) {
                    this.filterByStatus = statusRecord.state;
                    this.countByStatus[statusRecord.state] = angular.copy($filter('filter')(this.allClaimRecords, {status: statusRecord.state}).length);
                } else {
                    this.countByStatus[statusRecord.state] = $filter('filter')(this.allClaimRecords, { status: statusRecord.state }).length;
                }
            });
            this.claimsRecords = angular.copy($filter('filter')(this.allClaimRecords, {status: this.filterByStatus}));
        }

        this.selectAllClaims = function() {
            this.selectAll = !this.selectAll;
            this.allClaimRecords.forEach((claim) => {
                if (claim['status'] == this.filterByStatus) {
                    claim['selected'] = this.selectAll;
                    if (this.selectAll) {
                        this.selectedClaims.push(claim);
                    }
                }
            });
            if (!this.selectAll) {
                this.selectedClaims = [];
            }
        }

        this.sortByValue = function() {
            this.reverseSort = (this.sortBy == 'receivedDateDesc') ? false : true;
        }

        this.changeTab = function(tabName, tabindex) {
            var selectedTab = this.statuslist[tabindex]['tab'];
            switch(selectedTab) {
                case 'Approved':
                    this.filterByStatus = 'Approved';
                    this.claimsRecords = angular.copy($filter('filter')(this.allClaimRecords, {status: 'Approved'}));
                break;
                case 'InProgress':
                    this.filterByStatus = 'InProgress';
                    this.claimsRecords = angular.copy($filter('filter')(this.allClaimRecords, {status: 'InProgress'}));
                break;
                case 'Rejected':
                    this.filterByStatus = 'Rejected';
                    this.claimsRecords = angular.copy($filter('filter')(this.allClaimRecords, {status: 'Rejected'}));
                break;
                case 'Waitingforapproval':
                    this.filterByStatus = 'Waitingforapproval';
                    this.claimsRecords = angular.copy($filter('filter')(this.allClaimRecords, {status: 'Waitingforapproval'}));
                break;
                case 'Assigned':
                    this.filterByStatus = 'Assigned';
                    this.claimsRecords = angular.copy($filter('filter')(this.allClaimRecords, {status: 'Assigned'}));
                break;
                case 'newRequest':
                    this.filterByStatus = 'New Request';
                    this.claimsRecords = angular.copy($filter('filter')(this.allClaimRecords, {status: 'New Request'}));
                break;
                default:
                    console.log('no tabs available...');
            }
        }

        this.claimsToSelect = function(claimRecord) {
            if (claimRecord['selected']) {
                this.selectedClaims.push(claimRecord);
            } else {
                var claimIndex = this.selectedClaims.indexOf(claimRecord);
                if (claimIndex != -1) {
                    this.selectedClaims.splice(claimIndex, 1);
                }
            }
        }

        this.$doCheck = function() {
            angular.forEach(this.statuslist, (statusRecord, index) => {
                this.countByStatus[statusRecord.state] = angular.copy($filter('filter')(this.allClaimRecords, {status: statusRecord.state}).length);
            });
        }
    }

    angular
        .module('claims')
            .component('claimsListViewComponent', {
                bindings : {
                    statuslist: '<',
                    claimsRecords: '<',
                    selectedClaims: '=',
                    allClaimRecords: '='
                },
                templateUrl: "resources/shared/claimsListView-component/claimslistview.component.html",
                controller: ClaimsListViewController
            });
    
})();