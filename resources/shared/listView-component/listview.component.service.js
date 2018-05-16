(function() {
    'use strict';

    angular
        .module('claims')
        .service('ListViewService', ListViewService);
    
        ListViewService.$inject = [];
        var requestData = {};

        function ListViewService() {

            this.getRegistrationListViewHeader = function() {
                return [
                    {'label': 'Card Number', 'fieldName' : 'memberNumber', 'redirectable' : true},
                    {'label': 'Member Name', 'fieldName' : 'memberName', 'redirectable' : false},
                    {'label': 'Emirates ID', 'fieldName' : 'emiratesId', 'redirectable' : false},
                    {'label': 'Policy Number', 'fieldName' : 'policyNumber', 'redirectable' : false},
                    {'label': 'Voucher Number', 'fieldName' : 'voucherNumber', 'redirectable' : false},
                    {'label': 'Mobile Number', 'fieldName' : 'mobileNum1', 'redirectable' : false},
                    {'label': 'Service From Date', 'fieldName' : 'serviceFmDate', 'redirectable' : false, type:"date"}
                ];
            }

            this.setRequestData = function(request) {
                this.requestData = request;
            }
    
            this.getRequestData = function() {
                return this.requestData;
            }

            this.getUserAssignmentListViewHeader = function() {
                return [
                    {'label': 'User Id', 'fieldName' : 'userId', 'type': 'id'},
                    {'label': 'Name', 'fieldName' : 'name'},
                    {'label': 'Assigned', 'fieldName' : 'assigned', 'class' : 'text-center'},
                    {'label': 'Pending', 'fieldName' : 'pending', 'class' : 'text-center'},
                    {'label': '', 'fieldName' : 'isSelected', 'isCheckBox' : true}
                ];
            }
        }

})();