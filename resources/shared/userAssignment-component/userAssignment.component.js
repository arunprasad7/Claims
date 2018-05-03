(function() {
    'use strict';

    function UserAssignmentController($scope, $element, $attrs, $filter) {

        this.storeUser = [];

        this.$onInit = function() {
            this.storeUser = angular.copy(this.users);
        }

        this.querySearch = function(query) {
            return query ? this.users.filter(createFilterFor(query)) : this.users;
        }

        this.filterByUser = function(userSearchText) {
            if (userSearchText == "" || userSearchText == undefined || userSearchText == null) {
                this.users = angular.copy(this.storeUser);
                if (this.selectedUser) {
                    this.selectedUser = {};
                }
            } else {
                this.users = $filter('filter')(this.storeUser, { name: userSearchText });
            }
        }

        function createFilterFor(query) {
            var lowercaseQuery = angular.lowercase(query);
            return function filterFn(state) {
                return (((angular.lowercase(state.name).indexOf(lowercaseQuery) != 0) && angular.lowercase(state.name).indexOf(lowercaseQuery) != -1) || (angular.lowercase(state.name).indexOf(lowercaseQuery) === 0));
            };
        }
    }

    angular
        .module('claims')
            .component('userAssignmentComponent', {
                bindings : {
                    headers : '<',
                    users: '<',
                    selectedUser: '=',
                    assignedToSelectedUser: '&'
                },
                templateUrl: "resources/shared/userAssignment-component/userAssignment.component.html",
                controller: UserAssignmentController
            });
    
})();