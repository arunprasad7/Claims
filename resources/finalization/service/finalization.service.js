(function() {
    'use strict';    
    angular
        .module('claims')
        .service('FinalizationService', FinalizationService)

    FinalizationService.$inject = [];

    function FinalizationService() {
        // this.getFinalizationHeader = function() {
        //     return [
        //         {'label': 'Claim Number', 'fieldName' : 'claimNumber'},
                
        //     ];
        // }
        // this.setRequestData = function(request) {
        //     this.requestData = request;
        // }

        // this.getRequestData = function() {
        //     return this.requestData;
        // }
    }
})();
