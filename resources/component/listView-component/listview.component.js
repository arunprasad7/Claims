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

        this.getSelectedData = function(selectedRecord) {
            this.selectedUser = selectedRecord;
        }
    }

    angular
        .module('claims')
            .component('listViewComponent', {
                bindings : {
                    headers: '<',
                    requests: '<',
                    redirectto: '@',
                    selectedUser: '='
                },
                templateUrl: "resources/component/listView-component/listview.component.html",
                controller: listViewController
            });
    
})();