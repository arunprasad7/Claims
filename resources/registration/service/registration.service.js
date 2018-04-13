(function() {
    'use strict';

    angular
        .module('claims')
        .service('RegistrationService', RegistrationService)
    
    RegistrationService.$inject = [];
    function RegistrationService() {
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
                "paymentWay" : null,
                "ibanNum" : null
            };
        }

        this.registerClaim = function(data) {
            console.log("data :: ", data);
        }

        this.getClaimRegistrationList = function(params) {
            return [
                {
                    "memberName" : 'mem1',
                    "mobileNum1" : 9894838851,
                    "email1" : 'mem1@gmail.com',
                    'mobileNum2' : 9894838851,
                    "email2" : 'mem12@gmail.com',
                    "serviceFmDate" : new Date(),
                    "requestAmt" : 55555,
                    "reqType" : 'resubmission',
                    "encType" : 'outPatient',
                    "reqReceivedDate" : new Date(),
                    "prevRequest" : 123,
                    "source" : "post",
                    "paymentWay" : 'cheque',
                    "ibanNum" : "1235465ABSCSD"
                },
                {
                    "memberName" : 'mem2',
                    "mobileNum1" : 98444438851,
                    "email1" : 'mem65@gmail.com',
                    'mobileNum2' : 98444438851,
                    "email2" : 'mem32@gmail.com',
                    "serviceFmDate" : new Date(),
                    "requestAmt" : 55555,
                    "reqType" : 'newRequest',
                    "encType" : 'inPatient',
                    "reqReceivedDate" : new Date(),
                    "prevRequest" : 123,
                    "source" : "post",
                    "paymentWay" : 'iban',
                    "ibanNum" : "1235465ABSCSD"
                }
                ,
                {
                    "memberName" : 'mem4',
                    "mobileNum1" : 98444438851,
                    "email1" : 'mem65@gmail.com',
                    'mobileNum2' : 98444438851,
                    "email2" : 'mem32@gmail.com',
                    "serviceFmDate" : new Date(),
                    "requestAmt" : 55555,
                    "reqType" : 'resubmission',
                    "encType" : 'inPatient',
                    "reqReceivedDate" : new Date(),
                    "prevRequest" : 123,
                    "source" : "post",
                    "paymentWay" : 'iban',
                    "ibanNum" : "1235465ABSCSD"
                },
                {
                    "memberName" : 'mem3',
                    "mobileNum1" : 98444438851,
                    "email1" : 'mem65@gmail.com',
                    'mobileNum2' : 98444438851,
                    "email2" : 'mem32@gmail.com',
                    "serviceFmDate" : new Date(),
                    "requestAmt" : 55555,
                    "reqType" : 'newRequest',
                    "encType" : 'outPatient',
                    "reqReceivedDate" : new Date(),
                    "prevRequest" : 123,
                    "source" : "post",
                    "paymentWay" : 'iban',
                    "ibanNum" : "1235465ABSCSD"
                }
            ]
        }
        
        this.searchClaims = function(params) {
            return this.getClaimRegistrationList(params);
        }
    }
})();