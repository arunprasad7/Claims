(function() {
    'use strict';

    function listViewController($scope, $element, $attrs, $state, ListViewService) {

        this.sortBy = function(fieldName) {
            this.reverse = (this.fieldName === fieldName) ? !this.reverse : false;
            this.fieldName = fieldName;
        }

        this.navigateTo = function(requestData) {
            ListViewService.setRequestData(requestData);
            $state.go(this.redirectto);
        }
    }

    angular
        .module('claims')
            .component('listViewComponent', {
                bindings : {
                    headers: '<',
                    requests: '<',
                    redirectto: '@'   
                },
                templateUrl: "resources/shared/listView-component/listview.component.html",
                controller: listViewController
            });
    
})();