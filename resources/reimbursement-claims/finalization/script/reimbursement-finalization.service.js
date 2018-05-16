(function() {
    'use strict';    
    angular
        .module('claims')
        .service('ReimbursementFinalizationService', ReimbursementFinalizationService)

    ReimbursementFinalizationService.$inject = [];

    function ReimbursementFinalizationService() {

        this.getFinailzationRecords = function() {
            return [{
                batch: "#111111",
                batchFileName: "671-652d-d3453-MF17152-A002-CLAIM",
                receivedDate: '30 jan 2018',
                PaidToProviderCode: "4241",
                PaidToProviderName: "Al Noor Hospital",
                PaidTo: "Al Noor Hospital",
                Processed: "500000",
                unProcessed: "568890",
                rejectedAmount: "1,80,500",
                batchPaidAmount: "1,00,500",
                paymentWay: "Cheque",
                totalClaims: "923,515",
                paymentDate: "25 Mar 2018",
                paymentReference: "698536",
                status: "Approved",
                "id" : new Date().getTime() + 1
            }, {
                batch: "#222222",
                batchFileName: "6718281-652d-d3453-MF17152-A002-CLAIM",
                receivedDate: '19 jan 2018',
                PaidToProviderCode: "4241",
                PaidToProviderName: "Al Noor Hospital",
                PaidTo: "Al Noor Hospital",
                Processed: "500000",
                unProcessed: "568890",
                rejectedAmount: "1,30,400",
                batchPaidAmount: "1,00,500",
                paymentWay: "Iban",
                totalClaims: "238,515",
                paymentDate: "25 Mar 2018",
                paymentReference: "129856",
                status: "Approved",
                "id" : new Date().getTime() + 2
            }, {
                batch: "#22333",
                batchFileName: "6718281-652d-d3453-MF17152-A002-CLAIM",
                receivedDate: '19 jan 2018',
                PaidToProviderCode: "4241",
                PaidToProviderName: "Al Noor Hospital",
                PaidTo: "Al Noor Hospital",
                Processed: "900000",
                unProcessed: "568890",
                rejectedAmount: "1,20,530",
                batchPaidAmount: "1,00,500",
                paymentWay: "Cheque",
                totalClaims: "673,515",
                paymentDate: "25 Mar 2018",
                paymentReference: "485698",
                status: "Rejected",
            }, {
                batch: " #444444",
                batchFileName: "6718281-652d-d3453-MF17152-A002-CLAIM",
                receivedDate: '1 jan 2018',
                PaidToProviderCode: "4241",
                PaidToProviderName: "Al Noor Hospital",
                PaidTo: "Al Noor Hospital",
                Processed: "500000",
                unProcessed: "568890",
                rejectedAmount: "1,80,400",
                batchPaidAmount: "1,00,500",
                paymentWay: "Iban",
                totalClaims: "423,515",
                paymentDate: "25 Mar 2018",
                paymentReference: "885369",
                status: "Rejected",
                "id" : new Date().getTime() + 3
            }, {
                batch: "#555555",
                batchFileName: "6718281-652d-d3453-MF17152-A002-CLAIM",
                receivedDate: '23 jan 2018',
                PaidToProviderCode: "4241",
                PaidToProviderName: "Al Noor Hospital",
                PaidTo: "Al Noor Hospital",
                Processed: "500000",
                unProcessed: "568890",
                rejectedAmount: "1,10,520",
                batchPaidAmount: "1,00,500",
                paymentWay: "Cheque",
                totalClaims: "33,515",
                paymentDate: "25 Mar 2018",
                paymentReference: "268754",
                status: "Rejected",
                "id" : new Date().getTime() + 4
            }, {
                batch: "#666666",
                batchFileName: "A003-CLAIM",
                receivedDate: '24 jan 2018',
                PaidToProviderCode: "4241",
                PaidToProviderName: "Al Noor Hospital",
                PaidTo: "Al Noor Hospital",
                Processed: "500000",
                unProcessed: "568890",
                rejectedAmount: "1,90,500",
                batchPaidAmount: "1,00,500",
                paymentWay: "Iban",
                totalClaims: "223,515",
                paymentDate: "25 Mar 2018",
                paymentReference: "789652",
                status: "Rejected",
                "id" : new Date().getTime() + 5
            }];
        }

        this.getSearchDropDownValues = function() {
            return [
                { text : 'Cheque' },
                { text : 'Iban' } 
            ];
        }

        this.getSearchFields = function() {
            return [
                { label : 'Payment Reference', type :'text', name: 'payRef'},
                { label : 'Payment Way', type: 'dropDown', name: 'payWay'},
                { label : 'Claim Number', type: 'text', name: 'claimNumber'}
            ];
        }
    }
})();
