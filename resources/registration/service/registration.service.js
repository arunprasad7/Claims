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
                "voucherNumber" : null,
                "ibanNum" : null,
                "emiratesId":null,
                "paymentWay" : 'iban'
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
                    "emiratesId":45673,
                    "memberNumber": "9566340416",
                    "policyNumber": "0792418901",
                    "paymentWay" : "iban"
                },
                {
                    "memberName" : 'sherif',
                    "mobileNum1" : 9874563214,
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
                    "emiratesId":41113,
                    "memberNumber": "3457678876",
                    "policyNumber": "0884422909",
                    "paymentWay" : "cheque"
                },
                
                {
                    "memberName" : 'Shakhil',
                    "mobileNum1" : 7864388510,
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
                    "emiratesId":25437,
                     "memberNumber": "9324140416",
                     "policyNumber": "0909886612",
                     "paymentWay" : "cheque"
                },
                {
                    "memberName" : 'Rayaan',
                    "mobileNum1" : 8958438851,
                    "email1" : 'rayaan65@gmail.com',
                    'mobileNum2' : 9844738851,
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
                    "emiratesId":53672,
                    "memberNumber": "4196754416",
                    "policyNumber": "0304532091",
                    "paymentWay" : "iban"
                },
                {
                    "memberName" : 'Rizwan',
                    "mobileNum1" : 9844388565,
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
                    "ibanNum" : "1098455ABSCSD",
                    "emiratesId":57893,
                    "memberNumber": "9181140413",
                    "policyNumber": "0903322091",
                    "paymentWay" : "cheque"
                },
                {
                    "memberName" : 'Mahateer',
                    "mobileNum1" : 6844438851,
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
                    "emiratesId":48763,
                    "memberNumber": "3366312416",
                    "policyNumber": "0904532091",
                    "paymentWay" : "iban"
                },
                {
                    "memberName" : 'Mahira',
                    "mobileNum1" : 7844438851,
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
                    "emiratesId":89064,
                    "memberNumber": "7509340916",
                    "policyNumber": "0904221091",
                    "paymentWay" : "cheque"
                },
                {
                    "memberName" : 'Sumaiya',
                    "mobileNum1" : 8844438851,
                    "email1" : 'sumaiya65@gmail.com',
                    'mobileNum2' : 9844438851,
                    "email2" : 'sumaiya32@gmail.com',
                    "serviceFmDate" : new Date(),
                    "requestAmt" : 55555,
                    "reqType" : 'newRequest',
                    "encType" : 'outPatient',
                    "reqReceivedDate" : new Date(),
                    "prevRequest" : 123,
                    "source" : "post",
                    "voucherNumber" : '78915',
                    "ibanNum" : "1856465ABSCSD",
                    "emiratesId":78451,
                    "memberNumber": "8566340416",
                    "policyNumber": "0904588291",
                    "paymentWay" : "cheque"
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

        this.getDocumentTypes = function() {
            return [
                {id:'iban', label:'Iban', isRequired:true},
                {id:'reimbursementForm', label:'Reimbursement Form', isRequired:false},
                {id:'medicalBills', label:'Medical Bills', isRequired:true},
                {id:'medicalBillsSummary', label:'Medical Bills Summary', isRequired:false},
                {id:'prescription', label:'Prescription', isRequired:true},
                {id:'otherDocuments', label:'Other Documents', isRequired:false}
            ]
        }
    }
})();