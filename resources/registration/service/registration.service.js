(function() {
    'use strict';

    angular
        .module('claims')
        .service('RegistrationService', RegistrationService)
    
    RegistrationService.$inject = [];
    function RegistrationService() {
        this.claimObj = {};
        this.createRegDetailObj = function() {
            return {
                "memberName" : null,
                "mobileNum1" : null,
                "email1" : null,
                'mobileNum2' : null,
                "email2" : null,
                "serviceFmDate" : null,
                "requestAmt" : null,
                "encType" : null,
                "reqType" : null,
                "reqReceivedDate" : null,
                "prevRequest" : null,
                "source" : "post",
                "voucherNumber" : 'IBAN',
                "ibanNum" : null              
            };
        }

        this.registerClaim = function(data) {
            console.log("data :: ", data);
        }

        this.getClaimRegistrationList = function(params) {
            return [
                {
                    "memberName" : 'Naseeha',
                    "mobileNum1" : 9894838851,
                    "email1" : 'naseeha1@gmail.com',
                    'mobileNum2' : 9894838851,
                    "email2" : 'naseeha12@gmail.com',
                    "serviceFmDate" : new Date(),
                    "requestAmt" : 55555,
                    "reqType" : 'resubmission',
                    "encType" : 'outPatient',
                    "reqReceivedDate" : new Date(),
                    "prevRequest" : 123,
                    "source" : "post",
                    "voucherNumber" : 44587,
                    "ibanNum" : "1345465ABSCSD",
                    "referenceNumber": "8918563923549888739",
                    "memberNumber": "9566340416",
                    "policyNumber": "0792418901"
                },
                {
                    "memberName" : 'sherif',
                    "mobileNum1" : 98444438851,
                    "email1" : 'sherif65@gmail.com',
                    'mobileNum2' : 98444438851,
                    "email2" : 'sherif32@gmail.com',
                    "serviceFmDate" : new Date(),
                    "requestAmt" : 55555,
                    "reqType" : 'newRequest',
                    "encType" : 'inPatient',
                    "reqReceivedDate" : new Date(),
                    "prevRequest" : 123,
                    "source" : "post",
                    "voucherNumber" : 38221,
                    "ibanNum" : "1435675ABSCSD",
                    "referenceNumber": "8909876789009888789",
                    "memberNumber": "3457678876",
                    "policyNumber": "0884422909"
                },
                
                {
                    "memberName" : 'Shakhil',
                    "mobileNum1" : 98444438851,
                    "email1" : 'shakhil@gmail.com',
                    'mobileNum2' : 98444438851,
                    "email2" : 'shakil32@gmail.com',
                    "serviceFmDate" : new Date(),
                    "requestAmt" : 55555,
                    "reqType" : 'resubmission',
                    "encType" : 'inPatient',
                    "reqReceivedDate" : new Date(),
                    "prevRequest" : 123,
                    "source" : "post",
                    "voucherNumber" : 24859,
                    "ibanNum" : "1098763ABSCSD",
                    "referenceNumber": "8009876722822878913",
                     "memberNumber": "9324140416",
                     "policyNumber": "0909886612"
                },
                {
                    "memberName" : 'Rayaan',
                    "mobileNum1" : 98444438851,
                    "email1" : 'rayaan65@gmail.com',
                    'mobileNum2' : 98444438851,
                    "email2" : 'rayaan32@gmail.com',
                    "serviceFmDate" : new Date(),
                    "requestAmt" : 55555,
                    "reqType" : 'newRequest',
                    "encType" : 'outPatient',
                    "reqReceivedDate" : new Date(),
                    "prevRequest" : 123,
                    "source" : "post",
                    "voucherNumber" : 39758,
                    "ibanNum" : "1742465ABSCSD",
                    "referenceNumber": "8809876789009888784",
                    "memberNumber": "4196754416",
                    "policyNumber": "0304532091"
                },
                {
                    "memberName" : 'Rizwan',
                    "mobileNum1" : 98444438851,
                    "email1" : 'rizwan65@gmail.com',
                    'mobileNum2' : 98444438851,
                    "email2" : 'rizwan32@gmail.com',
                    "serviceFmDate" : new Date(),
                    "requestAmt" : 55555,
                    "reqType" : 'newRequest',
                    "encType" : 'outPatient',
                    "reqReceivedDate" : new Date(),
                    "prevRequest" : 123,
                    "source" : "post",
                    "voucherNumber" : 87924,
                    "ibanNum" : "10984565ABSCSD",
                    "referenceNumber": "8097276789009809184",
                    "memberNumber": "9181140413",
                    "policyNumber": "0903322091"
                },
                {
                    "memberName" : 'Mahateer',
                    "mobileNum1" : 98444438851,
                    "email1" : 'mahateer65@gmail.com',
                    'mobileNum2' : 98444438851,
                    "email2" : 'mahateer32@gmail.com',
                    "serviceFmDate" : new Date(),
                    "requestAmt" : 55555,
                    "reqType" : 'newRequest',
                    "encType" : 'outPatient',
                    "reqReceivedDate" : new Date(),
                    "prevRequest" : 123,
                    "source" : "post",
                    "voucherNumber" : 15789,
                    "ibanNum" : "1243565ABSCSD",
                    "referenceNumber": "8429876789007278784",
                    "memberNumber": "3366312416",
                    "policyNumber": "0904532091"
                },
                {
                    "memberName" : 'Mahira',
                    "mobileNum1" : 98444438851,
                    "email1" : 'mahira65@gmail.com',
                    'mobileNum2' : 98444438851,
                    "email2" : 'mahira32@gmail.com',
                    "serviceFmDate" : new Date(),
                    "requestAmt" : 55555,
                    "reqType" : 'newRequest',
                    "encType" : 'outPatient',
                    "reqReceivedDate" : new Date(),
                    "prevRequest" : 123,
                    "source" : "post",
                    "voucherNumber" : 36978,
                    "ibanNum" : "1909465ABSCSD",
                    "referenceNumber": "8341870989009643784",
                    "memberNumber": "7509340916",
                    "policyNumber": "0904221091"
                },
                {
                    "memberName" : 'Sumaiya',
                    "mobileNum1" : 98444438851,
                    "email1" : 'sumaiya65@gmail.com',
                    'mobileNum2' : 98444438851,
                    "email2" : 'sumaiya32@gmail.com',
                    "serviceFmDate" : new Date(),
                    "requestAmt" : 55555,
                    "reqType" : 'newRequest',
                    "encType" : 'outPatient',
                    "reqReceivedDate" : new Date(),
                    "prevRequest" : 123,
                    "source" : "post",
                    "voucherNumber" : '78915',
                    "ibanNum" : "185643 65ABSCSD",
                    "referenceNumber": "8409876789003328784",
                    "memberNumber": "8566340416",
                    "policyNumber": "0904588291"
                }

            ]
        }
        
        this.searchClaims = function(params) {
            return this.getClaimRegistrationList(params);
        }

        this.setClaim = function(claim) {
            this.claimObj = claim;
        }

        this.getClaim = function(claim) {
            return this.claimObj;
        }
    }
})();