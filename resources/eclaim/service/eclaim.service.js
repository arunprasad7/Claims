(function() {
    'use strict';

    angular
        .module('claims')
        .service('EclaimService', EclaimService)

    EclaimService.$inject = [];

    function EclaimService() {
        this.getClaimsRequest = function() {
            return [
                {'reqNum': 987896, 'claimStatus':'rejected', 'statusReason':'Waiting for Finalization', 'rejectedReason':'Waiting for Finalization'},
                {'reqNum': 187896, 'claimStatus':'rejected', 'statusReason':'Waiting for Approval', 'rejectedReason':'Waiting for Finalization'},
                {'reqNum': 287896, 'claimStatus':'rejected', 'statusReason':'Waiting for Finalization', 'rejectedReason':'Waiting for Finalization'},
                {'reqNum': 387896, 'claimStatus':'rejected', 'statusReason':'Waiting for Approval', 'rejectedReason':'Waiting for Finalization'},
                {'reqNum': 487896, 'claimStatus':'rejected', 'statusReason':'Waiting for Approval', 'rejectedReason':'Waiting for Finalization'},
                {'reqNum': 587896, 'claimStatus':'rejected', 'statusReason':'Waiting for Approval', 'rejectedReason':'Waiting for Finalization'},
                {'reqNum': 687896, 'claimStatus':'rejected', 'statusReason':'Waiting for Approval', 'rejectedReason':'Waiting for Finalization'}
            ];
        }

        this.getEclaimList = function() {
            return [
                {'serviceType':'1', 'serviceCode' : '90807', 'serviceFrmDate':new Date(), days:20, quantity: 10, 'treatmentCode' : '10010201-1', 'dhaPrice' : 1020, 'price':100, 'reqAmount':1000, 'dedAmount':500, 'approvedAmt' : 5000, 'rejectedAmt' : 9000, 'rejectedCode' : '100-1', 'shortfallAmount' : 500, 'status' : 'Approved', 'remarks' : 'Approved Claim.', 'rejDesc': ''},
                {'serviceType':'2', 'serviceCode' : '80806', 'serviceFrmDate':new Date(), days:30, quantity: 90, 'treatmentCode' : '10010201-1', 'dhaPrice' : 2020, 'price':200, 'reqAmount':2000, 'dedAmount':560, 'approvedAmt' : 6000, 'rejectedAmt' : 8000, 'rejectedCode' : '200-1', 'shortfallAmount' : 6500, 'status' : 'Rejected', 'remarks' : 'Claim Rejected.', 'rejDesc': 'Invalid Documents'},
                {'serviceType':'3', 'serviceCode' : '70805', 'serviceFrmDate':new Date(), days:30, quantity: 80, 'treatmentCode' : '10010201-1', 'dhaPrice' : 3020, 'price':130, 'reqAmount':3000, 'dedAmount':5700, 'approvedAmt' : 7000, 'rejectedAmt' : 7000, 'rejectedCode' : '30-1', 'shortfallAmount' : 600, 'status' : 'Approved', 'remarks' : 'Approved Claim.', 'rejDesc': ''},
                {'serviceType':'4', 'serviceCode' : '60804', 'serviceFrmDate':new Date(), days:26, quantity: 70, 'treatmentCode' : '10010201-1', 'dhaPrice' : 2420, 'price':410, 'reqAmount':4000, 'dedAmount':800, 'approvedAmt' : 8000, 'rejectedAmt' : 6000, 'rejectedCode' : '13210-1', 'shortfallAmount' : 507, 'status' : 'Approved', 'remarks' : 'Approved Claim.', 'rejDesc': ''},
                {'serviceType':'5', 'serviceCode' : '70803', 'serviceFrmDate':new Date(), days:260, quantity: 60, 'treatmentCode' : '10010201-1', 'dhaPrice' : 561020, 'price':560, 'reqAmount':5000, 'dedAmount':800, 'approvedAmt' : 9000, 'rejectedAmt' : 5000, 'rejectedCode' : 'hell0-1', 'shortfallAmount' : 540, 'status' : 'Approved', 'remarks' : 'Approved Claim.', 'rejDesc': ''},
                {'serviceType':'6', 'serviceCode' : '80802', 'serviceFrmDate':new Date(), days:240, quantity: 50, 'treatmentCode' : '10010201-1', 'dhaPrice' : 41020, 'price':780, 'reqAmount':6000, 'dedAmount':590, 'approvedAmt' : 1000, 'rejectedAmt' : 4000, 'rejectedCode' : 'heav100-1', 'shortfallAmount' : 1200, 'status' : 'Rejected', 'remarks' : 'Claim Rejected.', 'rejDesc': 'Invalid Documents'},
                {'serviceType':'7', 'serviceCode' : '10801', 'serviceFrmDate':new Date(), days:300, quantity: 40, 'treatmentCode' : '10010201-1', 'dhaPrice' : 961020, 'price':600, 'reqAmount':7000, 'dedAmount':100, 'approvedAmt' : 5100, 'rejectedAmt' : 3000, 'rejectedCode' : '200-1', 'shortfallAmount' : 5560, 'status' : 'Approved', 'remarks' : 'Approved Claim.', 'rejDesc': ''},
                {'serviceType':'8', 'serviceCode' : '12087', 'serviceFrmDate':new Date(), days:450, quantity: 30, 'treatmentCode' : '10010201-1', 'dhaPrice' : 24020, 'price':700, 'reqAmount':8000, 'dedAmount':500, 'approvedAmt' : 5300, 'rejectedAmt' : 2000, 'rejectedCode' : '2300-1', 'shortfallAmount' : 300, 'status' : 'Approved', 'remarks' : 'Approved Claim.', 'rejDesc': ''},
                {'serviceType':'9', 'serviceCode' : '13087', 'serviceFrmDate':new Date(), days:260, quantity: 20, 'treatmentCode' : '10010201-1', 'dhaPrice' : 5520, 'price':120, 'reqAmount':9000, 'dedAmount':980, 'approvedAmt' : 4500, 'rejectedAmt' : 2000, 'rejectedCode' : '400-1', 'shortfallAmount' : 800, 'status' : 'Approved', 'remarks' : 'Approved Claim.', 'rejDesc': ''},
                {'serviceType':'10', 'serviceCode' : '149807', 'serviceFrmDate':new Date(), days:240, quantity: 100, 'treatmentCode' : '10010201-1', 'dhaPrice' : 200, 'price':110, 'reqAmount':10000, 'dedAmount':210, 'approvedAmt' : 5000, 'rejectedAmt' : 6000, 'rejectedCode' : '500-1', 'shortfallAmount' : 500, 'status' : 'Rejected', 'remarks' : 'Approved Claim.', 'rejDesc': 'Invalid Documents'}
            ]
        }

        this.newClaim = function() {
            return {
                'serviceType':'', 'serviceCode' : '', 'serviceFrmDate':new Date(), days:1, quantity: null, 'treatmentCode' : '', 'dhaPrice' : null, 'price':null, 'reqAmount':null, 'dedAmount':null, 'approvedAmt' : null, 'rejectedAmt' : null, 'rejectedCode' : '', 'shortfallAmount' : null, 'status' : '', 'remarks' : ''
            }
        }
    }
})();