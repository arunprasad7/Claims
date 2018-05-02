(function() {
    'use strict';

    angular
        .module('claims')
        .service('ListViewService', ListViewService);
    
        ListViewService.$inject = [];
        this.requestData = {};

        function ListViewService() {

            this.getRegistrationListViewHeader = function() {
                return [
                    {'label': 'Member Card Number', 'fieldName' : 'memberNumber', 'isDocument':false, 'redirectable' : true},
                    {'label': 'Member Name', 'fieldName' : 'memberName', 'isDocument':false, 'redirectable' : false},
                    {'label': 'Policy Number', 'fieldName' : 'policyNumber', 'isDocument':false, 'redirectable' : false},
                    {'label': 'Voucher Number', 'fieldName' : 'voucherNumber', 'isDocument':false, 'redirectable' : false},
                    {'label': 'IBAN Number', 'fieldName' : 'ibanNum', 'isDocument':false, 'redirectable' : false},
                    {'label': 'IBAN Document', 'fieldName' : 'ibanDocument', 'isDocument':true, 'redirectable' : false}
                ];
            }

            this.setRequestData = function(request) {
                this.requestData = request;
            }
    
            this.getRequestData = function() {
                return this.requestData;
            }
        }

})();