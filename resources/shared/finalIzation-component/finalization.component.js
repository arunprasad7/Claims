(function() {
    'use strict';

    function FinalizationViewController($scope, $element, $attrs, $state, FinalizationComponentService) {

    }
    
    angular
        .module('claims')
            .component('finalizationComponent', {
                bindings : {
                    headers: '<',
                    requests: '=',
                    redirectto: '@',
                    selectedUser: '='
                },
                templateUrl: "resources/shared/finalization-component/finalization.component.html",
                controller: FinalizationViewController
            });
    
})();