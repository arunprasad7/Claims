(function() {
    'use strict';

    angular
        .module('claims')
        .service('ReimbursementProcessingService', ReimbursementProcessingService)
    
    ReimbursementProcessingService.$inject = [];
    function ReimbursementProcessingService() {
        this.createNewReimbursmentObject = function() {
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
    }
})();