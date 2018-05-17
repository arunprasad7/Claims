(function() {
    'use strict';

    angular
        .module('claims')
        .service('ClaimsListViewService', ClaimsListViewService);

        function ClaimsListViewService() {

            this.getTabsToDisplay = function() {
                return [
                    {'label': 'New Request', 'tab' : 'newRequest', 'state': 'New Request'},
                    {'label': 'In Progress', 'tab' : 'InProgress', 'state': 'InProgress'},
                    {'label': 'Approved', 'tab' : 'Approved', 'state': 'Approved'},
                    {'label': 'Waiting for Approval', 'tab' : 'Waitingforapproval', 'state': 'Waitingforapproval'},
                    {'label': 'Rejected', 'tab' : 'Rejected', 'state': 'Rejected'},
                    {'label': 'Assigned', 'tab' : 'Assigned', 'state': 'Assigned'}
                ];
            }
        }
})();