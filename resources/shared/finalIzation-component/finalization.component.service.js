(function () {
    'use strict';

    angular
        .module('claims')
        .service('FinalizationComponentService', FinalizationComponentService);

    FinalizationComponentService.$inject = [];
    var requestData = {};

    function FinalizationComponentService() {

        this.getFinalizationHeader = function () {
            return [
                [{ 'label': 'Claim Number', 'fieldName': 'batch' ,'isBatch' : true,'isfinal' : false,'istotal' : false,'istimer' :false}, { 'label': 'Received Date', 'fieldName': 'receivedDate' ,'isBatch' : false,'isfinal' : false,'istotal' : false,'istimer' :true,'istext' :true}, { 'label': 'hi', 'fieldName': 'status' ,'isBatch' : false,'isfinal' : false,'istotal' : false,'istimer' :false}],
                [{ 'label': 'Paid To', 'fieldName': 'PaidTo' ,'isBatch' : false,'isfinal' : true,'istotal' : false,'istimer' :false}],
                [{ 'label': 'RejectedAmount', 'fieldName': 'rejectedAmount' ,'isBatch' : false,'isfinal' : false,'istotal' : false,'istimer' :false}, { 'label': 'Payment Way', 'fieldName': 'paymentWay' ,'isBatch' : false,'isfinal' : false,'istotal' : false,'istimer' :false}],
                [{ 'label': 'Payment Date', 'fieldName': 'paymentDate' ,'isBatch' : false,'isfinal' : false,'istotal' : false,'istimer' :false}, { 'label': 'Payment Reference', 'fieldName': 'paymentReference' ,'isBatch' : false,'isfinal' : false,'istotal' : false,'istimer' :false}],
                [{ 'label': 'Total Claims', 'fieldName': 'totalClaims' ,'isBatch' : false,'isfinal' : false,'istotal' : true,'istimer' :false}],
            ];
        }
        this.setRequestData = function (request) {
            this.requestData = request;
        }

        this.getRequestData = function () {
            return this.requestData;
        }
      
    }
})();
// [{ 'label': 'Claim Number', 'fieldName': 'batch' ,'isBatch' : true,'isfinal' : false,'istotal' : false,'istimer' :false}, { 'label': 'Received Date', 'fieldName': 'receivedDate' ,'isBatch' : false,'isfinal' : false,'istotal' : false,'istimer' :true}, { 'label': '', 'fieldName': 'status' ,'isBatch' : false,'isfinal' : false,'istotal' : false,'istimer' :false}],
// [{ 'label': 'Paid To', 'fieldName': 'PaidTo' ,'isBatch' : false,'isfinal' : true,'istotal' : false,'istimer' :false}],
// [{ 'label': 'RejectedAmount', 'fieldName': 'rejectedAmount' ,'isBatch' : false,'isfinal' : false,'istotal' : false,'istimer' :false}, { 'label': 'Payment Way', 'fieldName': 'paymentWay' ,'isBatch' : false,'isfinal' : false,'istotal' : false,'istimer' :false}],
// [{ 'label': 'Payment Date', 'fieldName': 'paymentDate' ,'isBatch' : false,'isfinal' : false,'istotal' : false,'istimer' :false}, { 'label': 'Payment Reference', 'fieldName': 'paymentReference' ,'isBatch' : false,'isfinal' : false,'istotal' : false,'istimer' :false}],
// [{ 'label': 'Total Claims', 'fieldName': 'totalClaims' ,'isBatch' : false,'isfinal' : false,'istotal' : true,'istimer' :false}],s